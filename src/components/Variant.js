import React from 'react';

class Variant extends React.Component {

  render() {
    return (
        <form>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="fileName">File name</label>
              <input type="text" className="form-control" id="fileName" placeholder="File name"
                     defaultValue={this.props.design.fileName}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="iWidth">Image widdth</label>
              <input type="number" className="form-control" id="iWidth" placeholder="Image widdth"
                     defaultValue={this.props.design.iWidth}
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="iHeight">Image height</label>
              <input type="number" className="form-control" id="iHeight" placeholder="Image height"
                     defaultValue={this.props.design.iHeight}
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
                  />
                  <label className="form-check-label" htmlFor={`density1_${this.props.id}`}>1</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="density" id={`density2_${this.props.id}`}
                         defaultValue="2"
                         defaultChecked={this.props.design.density === 2}
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
