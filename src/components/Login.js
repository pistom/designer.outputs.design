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
    this.props.getProjectData(this.state.projectId, this.state.password);
    this.props.getProjectMessages(this.state.projectId, this.state.password);
  }

  render() {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6 text-center">
              <h1>designOutputs</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="projectId">Project ID</label>
                  <input className="form-control" type="text" id="projectId" value={this.state.projectId} onChange={this.handleChangeProjectId}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input className="form-control" type="password" id="password" value={this.state.password} onChange={this.handleChangePassword}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
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
