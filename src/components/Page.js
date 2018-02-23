import React from 'react';
import Variant from './Variant';
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import 'uppy/dist/uppy.css'


class Page extends React.Component {
  constructor() {
    super();
    this.handleBreakpointChange = this.handleBreakpointChange.bind(this);
    this.handleSavePage = this.handleSavePage.bind(this);
    this.handleUploadFilesBtn = this.handleUploadFilesBtn.bind(this);
  }

  componentWillMount() {
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
      console.log(result)
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

  render() {
    const page = this.props.appState.editedPage;
    return [
      <h2 key="title">
        {this.props.appState.editedPage ? "Edit" : "Add"} page
        {this.props.appState.editedPage ? <strong> – {this.props.appState.editedPage}</strong> : null}
      </h2>,
      <div key="buttons" className="float-right">
        <div className="btn-group mt-2" role="group">
          <button type="submit" className="btn btn-secondary" onClick={this.handleUploadFilesBtn}>Upload files</button>
          <button type="submit" className="btn btn-primary" onClick={this.handleSavePage}>Save</button>
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
            row.push(
                <div key={i} className="col">
                  {this.props.projectData.numberOfVersions > 1 ? <h5>Variant {variant}</h5> : null}
                  <Variant
                      design={this.props.projectData.pages[page].devices[device].designs[variant]}
                      page={page}
                      device={device}
                      variant={variant}
                      id={Math.floor(Math.random() * 1000)}
                      actions={this.props.actions}
                  />
                </div>
            );
          }
          return [
            <h3 key={device + "_name"} className="border-top mt-3 pt-3">{device}</h3>,
            <div key="breakpoint">
              <form className="form-inline">
                <div className="form-group mb-2">
                  <label htmlFor={`breakpoint_${device}`} className="mr-2">Breakpoint width:</label>
                  <input type="number" className="form-control" id={`breakpoint_${device}`}
                         placeholder="Breakpoint width"
                         defaultValue={this.props.projectData.pages[page].devices[device].bWidth}
                         onChange={(e) => this.handleBreakpointChange(device, e.target.value)}
                  />
                </div>
              </form>
            </div>,
            <div key={device + "_content"} className="row mt-3">
              {row}
            </div>
          ]
        })}
      </div>
    ];
  }
}

Page.displayName = 'Page';

export default Page;
