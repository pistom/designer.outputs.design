import React from 'react';

class Pages extends React.Component {

  render() {
    return [
      <h1 key="title">Pages</h1>,
      <div key="actions" className="row text-right mt-2">
        <div className="col-sm-12">
          <button type="button" className="btn btn-primary"
                  onClick={() => this.props.actions.selectStep("page")}
          >
            Add page
          </button>
        </div>
      </div>,
      <div key="content">
        {Object.keys(this.props.projectData.pages).map(page => {
          return (
              <div key={page} className="row mt-2 border-top">
                <div className="col-8 mt-2"><p>{page}</p></div>
                <div className="col-4 mt-2 text-right">
                  <button className="btn btn-primary"
                          onClick={() => this.props.actions.selectStep("page", page)}
                  >
                    Edit
                  </button>
                </div>
              </div>
          )
        })}
      </div>
    ];
  }
}

Pages.displayName = 'Pages';

export default Pages;
