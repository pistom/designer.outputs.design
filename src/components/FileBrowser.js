import React from 'react'

class FileBrowser extends React.Component {

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
    return(
        <div className="list-group">
          {
            this.props.appState[this.props.imagesType] ?
                Object.keys(this.props.appState[this.props.imagesType]).map(image => {
                  return (
                      <button key={image} type="button" className="list-group-item list-group-item-action"
                              onClick={() => this.props.onSelectImage(
                                  this.props.appState[this.props.imagesType][image]
                              )}
                      >
                        {this.props.appState[this.props.imagesType][image]}
                      </button>
                  )
                }) : null
          }
        </div>
    )
  }

}

export default FileBrowser;
