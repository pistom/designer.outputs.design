import React from 'react';
import Background from './Background';
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import 'uppy/dist/uppy.css'
import FileBrowser from "./FileBrowser";
import $ from "jquery/dist/jquery";
import 'bootstrap/dist/js/bootstrap.bundle'

class Backgrounds extends React.Component {
  constructor(props) {
    super(props);
    this.props.actions.getFilesList(this.props.projectData.projectId, "background", this.props.appState.apiURL);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleAddBackground = this.handleAddBackground.bind(this);
    this.handleChangeBackgroundData = this.handleChangeBackgroundData.bind(this);
    this.handleUploadFilesBtn = this.handleUploadFilesBtn.bind(this);
    this.handleFocusBackgroundInput = this.handleFocusBackgroundInput.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  componentWillMount() {

    const backgrounds = [];
    Object.keys(this.props.projectData.backgrounds).forEach(bg => {
      backgrounds.push({
        bgName: bg,
        fileName: this.props.projectData.backgrounds[bg].fileName
      })
    });
    this.setState({
      backgrounds: backgrounds
    });

    this.uppy = Uppy({autoProceed: false})
        .use(Dashboard, {
          target: 'body',
          closeModalOnClickOutside: true
        })
        .use(XHRUpload, {
          endpoint: `${this.props.appState.apiURL}/uploadFiles.php?projectId=${this.props.projectData.projectId}&imageType=background`,
          fieldName: 'my_file'
        })
        .run();
    this.uppy.on('complete', () => {
      this.props.actions.getFilesList(this.props.projectData.projectId, "background", this.props.appState.apiURL);
    });
  }

  storeBackgroundsInfo() {
    const backgrounds = {};
    this.state.backgrounds.forEach(item => {
      backgrounds[item.bgName] = {
        fileName: item.fileName,
        bgSize: "cover",
        bgPosition: "center center"
      };
    });
    this.props.actions.storeBackgrounds(backgrounds)
  }

  handleSaveData(e) {
    e.preventDefault();
    this.storeBackgroundsInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projectData.backgrounds !== nextProps.projectData.backgrounds) {
      this.props.actions.saveProjectData(
          ['backgrounds'],
          Object.assign(this.props.projectData, {backgrounds: nextProps.projectData.backgrounds}),
          this.props.appState.apiURL
      );
    }
  }

  handleChangeBackgroundData(data, index) {
    let backgrounds = this.state.backgrounds;
    backgrounds[index] = data;
    this.setState({
      backgrounds: backgrounds
    });
  }

  handleFocusBackgroundInput(index) {
    $('#selectFileModal').modal('show');
    this.setState({
      selectedBackground: index
    })
  }

  handleAddBackground() {
    let backgrounds = this.state.backgrounds;
    backgrounds.push({
      bgName: "",
      fileName: ""
    });
    this.setState({
      backgrounds: backgrounds
    })
  }

  handleUploadFilesBtn() {
    this.uppy.getPlugin('Dashboard').openModal();
  }

  handleSelectImage(selectedImage) {
    $('#selectFileModal').modal('hide');
    let image = `${this.props.projectData.projectId}/backgrounds/${selectedImage}`;
    let backgrounds = Object.assign(this.state.backgrounds);
    backgrounds[this.state.selectedBackground].fileName = image;
    this.setState({
      backgrounds: backgrounds
    });
  }

  render() {
    return [
      <h1 key="title">Backgrounds</h1>,
      <div key="content">
        <form onSubmit={this.handleSaveData}>
          <div key="buttons" className="float-right mb-3">
            <div className="btn-group mt-2" role="group">
              <button type="submit" className="btn btn-secondary" onClick={this.handleUploadFilesBtn}>
                <i className="mi mi-file-upload "/> Upload files
              </button>
              <button type="submit" className="btn btn-primary" onClick={this.handleAddBackground}>
                <i className="mi mi-add "/> Add background
              </button>
            </div>
          </div>
          <div className="clearfix"/>
          {(this.state.backgrounds).map((bg, index) => {
            return (
                <Background
                    key={index}
                    arrayItem={index}
                    bgName={bg.bgName}
                    fileName={bg.fileName}
                    onChange={this.handleChangeBackgroundData}
                    onFocus={this.handleFocusBackgroundInput}
                />
            )
          })}
          <div className="row mt-3">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-primary">
                <i className="mi mi-save"/> Save</button>
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
                    imagesType="background"
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

Backgrounds.displayName = 'Backgrounds';

export default Backgrounds;
