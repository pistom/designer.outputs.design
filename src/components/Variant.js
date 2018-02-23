import React from 'react';

class Variant extends React.Component {

  constructor() {
    super();
    this.handleVariantImageSizeChange = this.handleVariantImageSizeChange.bind(this);
    this.handleDensityChange = this.handleDensityChange.bind(this);
    this.handleFileNameFocus = this.handleFileNameFocus.bind(this);
  }

  handleDensityChange(e) {
    this.props.actions.setVariantDensity(this.props.page, this.props.device, this.props.variant, Number(e.target.value));
  }

  handleVariantImageSizeChange(dimension, value) {
    this.props.actions.setVariantImageSize(this.props.page, this.props.device, this.props.variant, dimension, Number(value));
  }

  handleFileNameFocus() {
    this.props.onFocus(this.props.device, this.props.variant)
  }

  render() {
    return (
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fileName">File name</label>
              <input type="text" className="form-control" id="fileName" placeholder="File name" readOnly
                     value={(this.props.design.fileName) ? this.props.design.fileName.replace(/^.*[\\/]/, '') : ""}
                     onFocus={this.handleFileNameFocus}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="iWidth">Image width</label>
              <input type="number" className="form-control" id="iWidth" placeholder="Image widdth"
                     defaultValue={this.props.design.iWidth}
                     onChange={(e) => this.handleVariantImageSizeChange("iWidth", e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="iHeight">Image height</label>
              <input type="number" className="form-control" id="iHeight" placeholder="Image height"
                     defaultValue={this.props.design.iHeight}
                     onChange={(e) => this.handleVariantImageSizeChange("iHeight", e.target.value)}
              />
            </div>
          </div>
          <fieldset className="form-group">
            <div className="row">
              <legend className="col-form-label col-sm-3 pt-0">Pixel density</legend>
              <div className="col-sm-9">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="density" id={`density1_${this.props.id}`}
                         defaultValue="1"
                         defaultChecked={this.props.design.density === 1 || this.props.design.density === undefined}
                         onChange={this.handleDensityChange}
                  />
                  <label className="form-check-label" htmlFor={`density1_${this.props.id}`}>1</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="density" id={`density2_${this.props.id}`}
                         defaultValue="2"
                         defaultChecked={this.props.design.density === 2}
                         onChange={this.handleDensityChange}
                  />
                  <label className="form-check-label" htmlFor={`density2_${this.props.id}`}>2</label>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
    )
  }
}

Variant.displayName = "Variant";

export default Variant;
