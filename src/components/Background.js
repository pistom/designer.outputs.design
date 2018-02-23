import React from 'react';

class Background extends React.Component {

  constructor() {
    super();
    this.handleBgNameChange = this.handleBgNameChange.bind(this);
    this.handleFileNameFocus = this.handleFileNameFocus.bind(this);
  }

  componentWillMount() {
    this.setState({
      bgName: this.props.bgName,
      fileName: this.props.fileName
    })
  }

  handleBgNameChange(e) {
    this.setState({bgName: e.target.value});
    this.props.onChange(Object.assign(this.state, {bgName: e.target.value}), this.props.arrayItem);
  }

  handleFileNameFocus() {
    this.props.onFocus(this.props.arrayItem)
  }

  render() {
    return (
        <div className="row mt-2 border-top">
          <div className="col-sm-6 mt-2">
            <input type="text" name="bgName" className="form-control" placeholder="Background name"
                   value={this.state.bgName}
                   onChange={this.handleBgNameChange}
            />
          </div>
          <div className="col-sm-6 mt-2">
            <input type="text" name="fileName" className="form-control" placeholder="File" readOnly
                   value={this.props.fileName.replace(/^.*[\\/]/, '')}
                   onFocus={this.handleFileNameFocus}
            />
          </div>
        </div>
    )
  }
}

Background.displayName = 'Background';

export default Background;
