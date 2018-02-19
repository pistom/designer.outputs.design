import React from 'react';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleProjectPasswordChange = this.handleProjectPasswordChange.bind(this);
    this.handleSaveData = this.handleSaveData.bind(this);
    this.handleNumberOfVersionsChange = this.handleNumberOfVersionsChange.bind(this);
    this.state = {
      name: this.props.projectData.name,
      password: '',
      numberOfVersions: this.props.projectData.numberOfVersions
    };
  }

  handleSaveData(e) {
    e.preventDefault();
    this.props.actions.saveProjectData(['name', 'password', 'numberOfVersions'], this.props.projectData);
  }

  handleProjectNameChange(e) {
    this.setState({name: e.target.value});
    this.props.actions.setProjectName(e.target.value);
  }

  handleProjectPasswordChange(e) {
    this.props.actions.setProjectPassword(e.target.value);
  }

  handleNumberOfVersionsChange(e) {
    const n = Number(e.target.value);
    this.setState({numberOfVersions: n});
    this.props.actions.setNumberOfVersions(n);
  }

  render() {
    return [
      <h1 key='title'>Project info</h1>,
      <div key="content">
        <form onSubmit={this.handleSaveData}>
          <div className="form-group">
            <label htmlFor="projectName">Project name</label>
            <input type="text" name="name" className="form-control" id="projectName" placeholder="Project name"
                   value={this.state.name}
                   onChange={this.handleProjectNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Project password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password"
                   onChange={this.handleProjectPasswordChange}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              Number of versions:
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="numberOfVersions" id="numberOfVersions1"
                     value="1"
                     checked={this.state.numberOfVersions === 1}
                     onChange={this.handleNumberOfVersionsChange}
              />
              <label className="form-check-label" htmlFor="numberOfVersions1">1</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="numberOfVersions" id="numberOfVersions2"
                     value="2"
                     checked={this.state.numberOfVersions === 2}
                     onChange={this.handleNumberOfVersionsChange}
              />
              <label className="form-check-label" htmlFor="numberOfVersions2">2</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    ];
  }
}

Home.displayName = 'Home';

export default Home;
