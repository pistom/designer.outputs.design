import React from 'react';
import Variant from './Variant';
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import 'uppy/dist/uppy.css'
import FileBrowser from './FileBrowser'
import $ from "jquery";


class Page extends React.Component {
  constructor() {
    super();
    this.handleBreakpointChange = this.handleBreakpointChange.bind(this);
    this.handleSavePage = this.handleSavePage.bind(this);
    this.handleUploadFilesBtn = this.handleUploadFilesBtn.bind(this);
    this.handleFocusBackgroundInput = this.handleFocusBackgroundInput.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  componentWillMount() {
    this.props.actions.getFilesList(this.props.projectData.projectId, "project", this.props.appState.apiURL);
    this.uppy = Uppy({autoProceed: false})
        .use(Dashboard, {
          target: 'body',
          closeModalOnClickOutside: true
        })
        .use(XHRUpload, {
          endpoint: `${this.props.appState.apiURL}/uploadFiles.php?projectId=${this.props.projectData.projectId}&imageType=project`,
          fieldName: 'my_file'
        })
        .run();
    this.uppy.on('complete', (result) => {
      this.props.actions.getFilesList(this.props.projectData.projectId, "project", this.props.appState.apiURL);
    });
  }

  handleBreakpointChange(device, value) {
    this.props.actions.setBreakpointWidth(
        this.props.appState.editedPage,
        device,
        Number(value)
    )
  }

  handleSavePage() {
    this.props.actions.saveProjectData(
        ['pages'],
        this.props.projectData,
        this.props.appState.apiURL
    );
  }

  handleUploadFilesBtn() {
    this.uppy.getPlugin('Dashboard').openModal();
  }

  handleFocusBackgroundInput(editedDevice, editedVariant) {
    $('#selectFileModal').modal('show');
    this.setState({
      editedDevice, editedVariant
    });
  }

  handleSelectImage(selectedImage) {
    $('#selectFileModal').modal('hide');
    this.props.actions.setVariantFileName(
        this.props.appState.editedPage,
        this.state.editedDevice,
        this.state.editedVariant,
        selectedImage
    );
  }

  render() {
    const page = this.props.appState.editedPage;
    return [
      <h2 key="title">
        Edit page — <strong> {this.props.appState.editedPage}</strong>
      </h2>,
      <div key="buttons" className="float-right">
        <div className="btn-group mt-2" role="group">
          <button type="submit" className="btn btn-secondary" onClick={this.handleUploadFilesBtn}>
            <i className="mi mi-file-upload "/> Upload files
          </button>
          <button type="submit" className="btn btn-primary" onClick={this.handleSavePage}>
            <i className="mi mi-save "/> Save
          </button>
        </div>
      </div>,
      <div key="clearfix" className="clearfix"/>,
      <div key="content" className="content">
        {Object.keys(this.props.projectData.devices).map(device => {
          const row = [];
          for (let i = 0; i < this.props.projectData.numberOfVersions; i++) {
            let variant;
            switch (i) {
              case 0:
                variant = "A";
                break;
              case 1:
                variant = "B";
                break;
              default:
                variant = "A";
            }
            let backgroundImage = `${this.props.appState.apiURL}/getImage.php?image=${this.props.projectData.projectId}/${this.props.projectData.pages[page].devices[device].designs[variant].fileName}`
            row.push(
                <div key={i} className="col-md-8 col-lg-6">
                  <div className="card">
                    <div className="card-img-top border-bottom"
                      style={{
                        height:"300px",
                        overflow: "auto"
                      }}
                    >
                      <img src={backgroundImage} alt="..." className="img-fluid"/>
                    </div>
                    <div className="card-body">
                        {this.props.projectData.numberOfVersions > 1 ? <h5 className="card-title">Variant {variant}</h5> : null}
                        <Variant
                            design={this.props.projectData.pages[page].devices[device].designs[variant]}
                            page={page}
                            device={device}
                            variant={variant}
                            id={Math.floor(Math.random() * 1000)}
                            actions={this.props.actions}
                            onFocus={this.handleFocusBackgroundInput}
                        />
                    </div>
                  </div>
                </div>
            );
          }
          return [
            <div key={device + "_name"} className="row border-top mt-3 pt-3">
              <div className="col-sm-8 col-md-9 col-lg-10">
                <h3>{device}</h3>
              </div>
              <div className="col-sm-4 col-md-3 col-lg-2">
                <div key="breakpoint">
                  <form className="form">
                    <div className="form-group mb-2">
                      <label htmlFor={`breakpoint_${device}`} className="mr-2 small">Breakpoint width:</label>
                      <input type="number" className="form-control" id={`breakpoint_${device}`}
                             placeholder="Breakpoint width"
                             defaultValue={this.props.projectData.pages[page].devices[device].bWidth}
                             onChange={(e) => this.handleBreakpointChange(device, e.target.value)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>,

            <div key={device + "_content"} className="row mt-3 justify-content-center">
              {row}
            </div>
          ]
        })}
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
                    imagesType="project"
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

Page.displayName = 'Page';

export default Page;
