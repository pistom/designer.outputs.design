import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import getProjectMessages from './actions/getProjectMessages';
import getProjectData from './actions/getProjectData';
import selectStep from './actions/selectStep';
import setProjectName from './actions/setProjectName';
import setProjectPassword from './actions/setProjectPassword';
import saveProjectData from './actions/saveProjectData';
import setNumberOfVersions from './actions/setNumberOfVersions';
import Login from './components/Login'
import Project from './components/Project'
import 'bootstrap/dist/css/bootstrap.css'

class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {
          !this.props.projectData.isLoadingData &&
          !this.props.projectData.loadingDataError &&
          !this.props.projectData.error ?
            (
              <Project
                appState={this.props.appState}
                actions={this.props.actions}
                projectData={this.props.projectData}
              />
            ) : (
              <Login
                apiURL={this.props.appState.apiURL}
                error={this.props.projectData.error}
                getProjectData={this.props.actions.getProjectData}
                getProjectMessages={this.props.actions.getProjectMessages}
                getMessages={this.props.actions.getMessages}
              />
            )
        }
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    projectData: store.projectData,
    projectMessages: store.projectMessages,
    appState: store.appState
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getProjectMessages,
    getProjectData,
    selectStep,
    setProjectName,
    setProjectPassword,
    saveProjectData,
    setNumberOfVersions
  };
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
