import React from 'react';
import fetch from "isomorphic-fetch";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {projectId: '', password: '', error: ''};
    this.handleChangeProjectId = this.handleChangeProjectId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
  }

  componentWillMount() {
    this.setState({
      projectId: '',
      password: '',
      error: '',
      newProjectId: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.error
    });
    if (nextProps.projectId) {
      this.setState({
        projectId: nextProps.projectId,
      });
    }
  }

  handleChangeProjectId(event) {
    this.setState({projectId: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
      error: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: ''
    });
    this.props.getProjectData(this.state.projectId, this.state.password, this.props.apiURL);
    this.props.getProjectMessages(this.state.projectId, this.state.password, this.props.apiURL);
  }

  handleCreateNewProject() {
    const dataSource = `${this.props.apiURL}/createProject.php`;
    fetch(dataSource, {method: 'GET'}).then(response => response.json()).then((response) => {
      this.setState({newProjectId: response});
    });
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center m-3 m-lg-5">
            <div className="col-sm-7 col-md-5 col-lg-4 text-center border bg-light pt-3">
              <h3>designOutputs</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{minWidth: 100}} id="basic-addon1">Project ID</span>
                    </div>
                    <input className="form-control" type="text" id="projectId"
                           value={this.state.projectId}
                           onChange={this.handleChangeProjectId}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{minWidth: 100}} id="basic-addon1">Password</span>
                    </div>
                    <input className="form-control" type="password" id="password"
                           value={this.state.password}
                           onChange={this.handleChangePassword}
                    />
                  </div>
                </div>
                <p className="text-right">
                  <button type="submit" className="btn btn-primary">Login</button>
                </p>
              </form>
              <p>{this.state.error}</p>
            </div>
          </div>

            {this.state.newProjectId === "" ?
                (
                    <p className="text-center">
                      <a className="btn btn-outline"
                         onClick={this.handleCreateNewProject}
                      >
                        Create new project
                      </a>
                    </p>
                ) :
                (
                    <p className="text-center">
                      Your new project ID is <br/>
                      <strong className="text-success">{this.state.newProjectId}</strong>
                    </p>
                )}
        </div>
    );
  }
}

Login.displayName = 'Login';
Login.propTypes = {};
Login.defaultProps = {};

export default Login;
