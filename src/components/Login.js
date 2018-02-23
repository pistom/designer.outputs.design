import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {projectId: '', password: '', error: ''};
    this.handleChangeProjectId = this.handleChangeProjectId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      projectId: '',
      password: '',
      error: ''
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

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center m-3 m-lg-5">
            <div className="col-sm-6 col-md-5 col-lg-4 text-center border">
              <h3>designOutputs</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">Project ID</span>
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
                      <span className="input-group-text" id="basic-addon1">Password</span>
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
        </div>
    );
  }
}

Login.displayName = 'Login';
Login.propTypes = {};
Login.defaultProps = {};

export default Login;
