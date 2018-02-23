import React from 'react';
import Device from './Device';
import Uppy from "uppy/lib/core/index";
import XHRUpload from "uppy/lib/plugins/XHRUpload";
import Dashboard from "uppy/lib/plugins/Dashboard/index";
import $ from "jquery";
import FileBrowser from './FileBrowser'

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.props.actions.getFilesList(this.props.projectData.projectId, "device", this.props.appState.apiURL);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleAddDevice = this.handleAddDevice.bind(this);
    this.handleChangeDeviceData = this.handleChangeDeviceData.bind(this);
    this.handleUploadFilesBtn = this.handleUploadFilesBtn.bind(this);
    this.handleFocusBackgroundInput = this.handleFocusBackgroundInput.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  componentWillMount() {
    const devices = [];
    Object.keys(this.props.projectData.devices).forEach(device => {
      devices.push({
        deviceName: device,
        fileName: this.props.projectData.devices[device].fileName,
        cWidth: this.props.projectData.devices[device].cWidth,
        cHeight: this.props.projectData.devices[device].cHeight,
        dWidth: this.props.projectData.devices[device].dWidth,
        dHeight: this.props.projectData.devices[device].dHeight,
        defaultBgImage: this.props.projectData.devices[device].defaultBgImage
      })
    });
    this.setState({devices})

    this.uppy = Uppy({autoProceed: false})
        .use(Dashboard, {
          target: 'body',
          closeModalOnClickOutside: true
        })
        .use(XHRUpload, {
          endpoint: `${this.props.appState.apiURL}/uploadFiles.php?projectId=${this.props.projectData.projectId}&imageType=device`,
          fieldName: 'my_file'
        })
        .run();
    this.uppy.on('complete', () => {
      this.props.actions.getFilesList(this.props.projectData.projectId, "device", this.props.appState.apiURL);
    });
  }

  storeDevicesInfo() {
    const devices = {};
    this.state.devices.forEach(item => {
      devices[item.deviceName] = {
        fileName: item.fileName,
        cWidth: item.cWidth,
        cHeight: item.cHeight,
        dWidth: item.dWidth,
        dHeight: item.dHeight,
        defaultBgImage: item.defaultBgImage
      };
    });
    this.props.actions.storeDevices(devices)
  }

  handleSaveData(e) {
    e.preventDefault();
    this.storeDevicesInfo();
  }

  handleChangeDeviceData(data, index) {
    let devices = this.state.devices;
    devices[index] = data;
    this.setState({devices});
  }

  handleAddDevice() {
    let devices = this.state.devices;
    devices.push({
      deviceName: "",
      fileName: "",
      cWidth: "",
      cHeight: "",
      dWidth: "",
      dHeight: "",
      defaultBgImage: ""
    });
    this.setState({devices})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projectData.devices !== nextProps.projectData.devices) {
      this.props.actions.saveProjectData(
          ['devices'],
          Object.assign(this.props.projectData, {devices: nextProps.projectData.devices}),
          this.props.appState.apiURL
      );
    }
  }

  handleUploadFilesBtn() {
    this.uppy.getPlugin('Dashboard').openModal();
  }

  handleFocusBackgroundInput(index) {
    $('#selectFileModal').modal('show');
    this.setState({
      selectedDevice: index
    })
  }

  handleSelectImage(selectedImage) {
    $('#selectFileModal').modal('hide');
    let image = `${this.props.projectData.projectId}/devices/${selectedImage}`;
    let devices = Object.assign(this.state.devices);
    devices[this.state.selectedDevice].fileName = image;
    this.setState({
      devices: devices
    });
  }

  render() {
    return [
      <h1 key="title">Devices</h1>,
      <div key="content">
        <form onSubmit={this.handleSaveData}>
          <div key="buttons" className="float-right mb-3">
            <div className="btn-group mt-2" role="group">
              <button type="submit" className="btn btn-secondary" onClick={this.handleUploadFilesBtn}>Upload files</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleAddDevice}>Add device</button>
            </div>
          </div>
          <div className="clearfix"/>
          <div className="row small d-none d-md-flex">
            <div className="col-sm-12 col-md-2 col-lg-2 mt-2">Name</div>
            <div className="col-sm-12 col-md-2 col-lg-2 mt-2">Image</div>
            <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
              <div className="row">
                <div className="col-3">Content width</div>
                <div className="col-3">Content height</div>
                <div className="col-3">Image width</div>
                <div className="col-3">Image height</div>
              </div>
            </div>
            <div className="col-sm-12 col-md-2 col-lg-2 mt-2">Default background</div>
          </div>
          {(this.state.devices).map((device, index) => {
            return (
                <Device
                    key={index}
                    arrayItem={index}
                    deviceName={device.deviceName}
                    fileName={device.fileName}
                    cWidth={device.cWidth}
                    cHeight={device.cHeight}
                    dWidth={device.dWidth}
                    dHeight={device.dHeight}
                    defaultBgImage={device.defaultBgImage}
                    onChange={this.handleChangeDeviceData}
                    onFocus={this.handleFocusBackgroundInput}
                />
            )
          })}
          <div className="row mt-3">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>

        </form>
      </div>,
      <div key="addPage">
        <div className="modal fade" id="selectFileModal" tabIndex="-1" role="dialog" aria-labelledby="addPageModal"
             aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Files</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <FileBrowser
                    imagesType="device"
                    actions={this.props.actions}
                    appState={this.props.appState}
                    projectData={this.props.projectData}
                    onSelectImage={this.handleSelectImage}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}

Devices.displayName = 'Devices';

export default Devices;
