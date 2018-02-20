import React from 'react';
import Device from './Device';

class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleAddDevice = this.handleAddDevice.bind(this);
    this.handleChangeDeviceData = this.handleChangeDeviceData.bind(this);
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

  render() {
    return [
      <h1 key="title">Devices</h1>,
      <div key="content">
        <form onSubmit={this.handleSaveData}>
          <div className="row text-right mt-2">
            <div className="col-sm-12">
              <button type="button" className="btn btn-primary" onClick={this.handleAddDevice}>Add device</button>
            </div>
          </div>
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
                />
            )
          })}
          <div className="row mt-3">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>

        </form>
      </div>
    ];
  }
}

Devices.displayName = 'Devices';

export default Devices;
