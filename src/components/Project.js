import React from 'react';
import MainMenu from './MainMenu'
import Content from './Content'

class Project extends React.Component {

  componentDidMount() {
  }

  render() {
    return [
      <MainMenu
          key='mainMenu'
          actions={this.props.actions}
          appState={this.props.appState}
          projectData={this.props.projectData}
      />,
      <Content
          key='content'
          appState={this.props.appState}
          actions={this.props.actions}
          projectData={this.props.projectData}
      />
    ];
  }
}

Project.displayName = 'Project';

export default Project;
