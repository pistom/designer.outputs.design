import React from 'react';
import Background from './Background';
import Uppy from 'uppy/lib/core'
import XHRUpload from 'uppy/lib/plugins/XHRUpload'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import 'uppy/dist/uppy.css'

class Backgrounds extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleAddBackground = this.handleAddBackground.bind(this);
    this.handleChangeBackgroundData = this.handleChangeBackgroundData.bind(this);
    this.handleUploadFilesBtn = this.handleUploadFilesBtn.bind(this);
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
    this.uppy.on('complete', (result) => {
      console.log(result)
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

  render() {
    return [
      <h1 key="title">Backgrounds</h1>,
      <div key="content">
        <form onSubmit={this.handleSaveData}>
          <div key="buttons" className="float-right mb-3">
            <div className="btn-group mt-2" role="group">
              <button type="submit" className="btn btn-secondary" onClick={this.handleUploadFilesBtn}>Upload files</button>
              <button type="submit" className="btn btn-primary" onClick={this.handleAddBackground}>Add background</button>
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

Backgrounds.displayName = 'Backgrounds';

export default Backgrounds;
