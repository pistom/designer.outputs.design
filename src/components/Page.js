import React from 'react';

class Page extends React.Component {
  constructor() {
    super();
    this.handleBreakpointChange = this.handleBreakpointChange.bind(this);
  }

  handleBreakpointChange() {
    console.log("test");
  }

  render() {
    const page = this.props.appState.editedPage;
    return [
      <h2 key="title">
        {this.props.appState.editedPage ? "Edit" : "Add"} page
        {this.props.appState.editedPage ? <strong> – {this.props.appState.editedPage}</strong> : null}
      </h2>,
      <div key="content" className="content">
        {Object.keys(this.props.projectData.devices).map(device => {
          const row = [];
          for (let i = 0; i < this.props.projectData.numberOfVersions; i++) {
            const variant = (i === 0) ? "A" : "B";
            row.push(
                <div key={i} className="col">
                  {this.props.projectData.numberOfVersions > 1 ? <h5>Variant {variant}</h5> : null}

                </div>
            );
          }
          return [
            <h3 key={device + "_name"} className="border-top mt-3">{device}</h3>,
            <div key="breakpoint">
              Breakpoint width:
              <input type="text"
                     defaultValue={this.props.projectData.pages[page].devices[device].bWidth}
                     onChange={this.handleBreakpointChange}
              />
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
