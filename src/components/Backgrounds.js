import React from 'react';
import Background from './Background';

class Backgrounds extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleAddBackground = this.handleAddBackground.bind(this);
    this.handleChangeBackgroundData = this.handleChangeBackgroundData.bind(this);
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
    })
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

  render() {
    return [
      <h1 key="title">Backgrounds</h1>,
      <div key="content">
        <form onSubmit={this.handleSaveData}>
          <div className="row text-right mt-2">
            <div className="col-sm-12">
              <button type="button" className="btn btn-primary" onClick={this.handleAddBackground}>Add background
              </button>
            </div>
          </div>
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
