import React from 'react';

class Background extends React.Component {

  constructor() {
    super();
    this.handleBgNameChange = this.handleBgNameChange.bind(this);
    this.handleFileNameChange = this.handleFileNameChange.bind(this);
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

  handleFileNameChange(e) {
    this.setState({fileName: e.target.value});
    this.props.onChange(Object.assign(this.state, {fileName: e.target.value}), this.props.arrayItem);
  }

  render() {
    return (
        <div className="row mt-2">
          <div className="col">
            <input type="text" name="bgName" className="form-control" placeholder="Background name"
                   value={this.state.bgName}
                   onChange={this.handleBgNameChange}
            />
          </div>
          <div className="col">
            <input type="text" name="fileName" className="form-control" placeholder="File"
                   value={this.state.fileName}
                   onChange={this.handleFileNameChange}
            />
          </div>
        </div>
    )
  }
}

Background.displayName = 'Background';

export default Background;
