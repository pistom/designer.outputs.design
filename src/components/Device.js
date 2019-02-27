import React from 'react';

class Device extends React.Component {

  constructor() {
    super();
    this.handleBgNameChange = this.handleBgNameChange.bind(this);
    this.handleFileNameChange = this.handleFileNameChange.bind(this);
    this.handleDefaultBgImageChange = this.handleDefaultBgImageChange.bind(this);
    this.handleDimensionsChange = this.handleDimensionsChange.bind(this);
    this.handleFileNameFocus = this.handleFileNameFocus.bind(this);
  }

  componentWillMount() {
    this.setState({
      deviceName: this.props.deviceName,
      fileName: this.props.fileName,
      cWidth: this.props.cWidth,
      cHeight: this.props.cHeight,
      dWidth: this.props.dWidth,
      dHeight: this.props.dHeight,
      defaultBgImage: this.props.defaultBgImage
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.fileName !== nextProps.fileName){
      this.setState({
        fileName: nextProps.fileName,
      })
    }
  }

  handleBgNameChange(e) {
    this.setState({deviceName: e.target.value});
    this.props.onChange(Object.assign(this.state, {deviceName: e.target.value}), this.props.arrayItem);
  }

  handleFileNameChange(e) {
    this.setState({fileName: e.target.value});
    this.props.onChange(Object.assign(this.state, {fileName: e.target.value}), this.props.arrayItem);
  }

  handleDefaultBgImageChange(e) {
    this.setState({defaultBgImage: e.target.value});
    this.props.onChange(Object.assign(this.state, {defaultBgImage: e.target.value}), this.props.arrayItem);
  }

  handleDimensionsChange(dim, val) {
    this.setState({[dim]: Number(val)});
    this.props.onChange(Object.assign(this.state, {[dim]: Number(val)}), this.props.arrayItem);
  }

  handleFileNameFocus() {
    this.props.onFocus(this.props.arrayItem)
  }

  render() {
    return (
        <div className="row mt-2 border-top">
          <div className="col-sm-12 col-md-2 col-lg-2 mt-2">
            <input type="text" name="bgName" className="form-control" placeholder="Device name"
                   value={this.state.deviceName}
                   onChange={this.handleBgNameChange}
            />
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2 mt-2">
            <input type="text" name="fileName" className="form-control" placeholder="File" readOnly
                   value={this.props.fileName.replace(/^.*[\\/]/, '')}
                   onFocus={this.handleFileNameFocus}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 mt-2">
            <div className="row">
              <div className="col-3">
                <input type="text" name="cWidth" className="form-control" placeholder="Content width"
                       value={this.state.cWidth}
                       onChange={(e) => this.handleDimensionsChange("cWidth", e.target.value)}
                />
              </div>
              <div className="col-3">
                <input type="text" name="cHeight" className="form-control" placeholder="Content height"
                       value={this.state.cHeight}
                       onChange={(e) => this.handleDimensionsChange("cHeight", e.target.value)}
                />
              </div>
              <div className="col-3">
                <input type="text" name="dWidth" className="form-control" placeholder="Image width"
                       value={this.state.dWidth}
                       onChange={(e) => this.handleDimensionsChange("dWidth", e.target.value)}
                />
              </div>
              <div className="col-3">
                <input type="text" name="dHeight" className="form-control" placeholder="Image height"
                       value={this.state.dHeight}
                       onChange={(e) => this.handleDimensionsChange("dHeight", e.target.value)}
                />
              </div>
            </div>

          </div>
          <div className="col-sm-12 col-md-2 col-lg-2 mt-2">
            <input type="text" name="fileName" className="form-control" placeholder="Background"
                   value={this.state.defaultBgImage}
                   onChange={this.handleDefaultBgImageChange}
            />
          </div>
        </div>
    )
  }
}

Device.displayName = 'Device';

export default Device;
