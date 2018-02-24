import React from 'react';
import $ from "jquery/dist/jquery";
import 'bootstrap/dist/js/bootstrap.bundle'
import {Link} from 'react-router-dom';


class Pages extends React.Component {

  constructor() {
    super();
    this.handleAddEditPageClick = this.handleAddEditPageClick.bind(this);
    this.handleSavePageBtnClicked = this.handleSavePageBtnClicked.bind(this);
    this.handlePageNameChanged = this.handlePageNameChanged.bind(this);
    this.state = {
      editedTitle: undefined,
      edited: undefined
    };
  }

  handleAddEditPageClick(title) {
    this.setState({
      editedTitle: title || false,
      edited: !!title,
      originalName: title
    })
  }

  handleSavePageBtnClicked(oldName, newName) {
    $('#addPageModal').modal('hide');
    this.props.actions.savePageName(oldName, newName, this.props.projectData);
    this.props.actions.saveProjectData(
        ['pages'],
        this.props.projectData,
        this.props.appState.apiURL
    );
  }

  handlePageNameChanged(e) {
    this.setState({
      editedTitle: e.target.value
    })
  }

  render() {
    return [
      <h1 key="title">Pages</h1>,
      <div key="actions" className="row text-right mt-2">
        <div className="col-sm-12">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addPageModal"
                  onClick={() => this.handleAddEditPageClick()}
          >
            <i className="mi mi-note-add mr-1"/>
            Add page
          </button>
        </div>
      </div>,
      <div key="content">
        {Object.keys(this.props.projectData.pages).map(page => {
          return (
              <div key={page} className="row mt-2 border-top">
                <div className="col-8 mt-2">
                  <h4>
                    {page}
                    <button type="button" className="btn btn-link btn-sm ml-1" data-toggle="modal"
                            data-target="#addPageModal"
                            onClick={() => this.handleAddEditPageClick(page)}
                    >
                      <i className="mi mi-mode-edit"/> Edit name
                    </button>
                  </h4>
                </div>
                <div className="col-4 mt-2 text-right">
                  <Link className="btn btn-primary"
                        to="/page"
                        onClick={() => this.props.actions.selectStep("page", page)}
                  >
                    <i className="mi mi-mode-edit"/> Edit
                  </Link>
                </div>
              </div>
          )
        })}
      </div>,
      <div key="addPage">
        <div className="modal fade" id="addPageModal" tabIndex="-1" role="dialog" aria-labelledby="addPageModal"
             aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.state.edited ? "Edit" : "Add"} page</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input className="form-control" placeholder="Page name"
                       value={this.state.editedTitle || ""}
                       onChange={this.handlePageNameChanged}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary"
                        onClick={() => this.handleSavePageBtnClicked(this.state.originalName, this.state.editedTitle)}
                >
                  {this.state.edited ? "Save change" : "Add page"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ];
  }
}

Pages.displayName = 'Pages';

export default Pages;
