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
      <div>
        <h1>designOutputs</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="projectId">Project ID</label>
          <input type="text" id="projectId" value={this.state.projectId} onChange={this.handleChangeProjectId} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.state.password} onChange={this.handleChangePassword} />
          <p><input type="submit" value="Login" /></p>
        </form>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

Login.displayName = 'Login';
Login.propTypes = {};
Login.defaultProps = {};

export default Login;
