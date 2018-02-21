import React from 'react';
import Variant from './Variant';

class Page extends React.Component {
  constructor() {
    super();
    this.handleBreakpointChange = this.handleBreakpointChange.bind(this);
    this.handleSavePage = this.handleSavePage.bind(this);
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

  render() {
    const page = this.props.appState.editedPage;
    return [
      <h2 key="title">
        {this.props.appState.editedPage ? "Edit" : "Add"} page
        {this.props.appState.editedPage ? <strong> – {this.props.appState.editedPage}</strong> : null}
      </h2>,
      <div key="save" className="row mt-3">
        <div className="col-sm-12 text-right">
          <button type="submit" className="btn btn-primary" onClick={this.handleSavePage}>Save</button>
        </div>
      </div>,
      <div key="content" className="content">
        {Object.keys(this.props.projectData.devices).map(device => {
          const row = [];
          for (let i = 0; i < this.props.projectData.numberOfVersions; i++) {
            let variant;
            switch (i) {
              case 0: variant = "A"; break;
              case 1: variant = "B"; break;
              default: variant = "A";
            }
            row.push(
                <div key={i} className="col">
                  {this.props.projectData.numberOfVersions > 1 ? <h5>Variant {variant}</h5> : null}
                  <Variant
                    design={this.props.projectData.pages[page].devices[device].designs[variant]}
                    variantName={variant}
                    id={Math.floor(Math.random() * 1000)}
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
