import React from 'react';
import MainMenu from './MainMenu'
import Home from './Home'
import Devices from './Devices'
import Backgrounds from './Backgrounds'
import Pages from './Pages'
import Page from './Page'
import Messages from './Messages'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class Project extends React.Component {

  render() {
    return (
        <Router>
          <div>
            <MainMenu
                key='mainMenu'
                actions={this.props.actions}
                appState={this.props.appState}
                projectData={this.props.projectData}
            />
            <div className="container">
              <Route exact path="/" render={() =>
                  <Home
                      appState={this.props.appState}
                      actions={this.props.actions}
                      projectData={this.props.projectData}
                  />
                }
              />
              <Route path="/backgrounds" render={() =>
                  <Backgrounds
                      appState={this.props.appState}
                      actions={this.props.actions}
                      projectData={this.props.projectData}
                  />
                }
              />
              <Route path="/devices" render={() =>
                  <Devices
                      appState={this.props.appState}
                      actions={this.props.actions}
                      projectData={this.props.projectData}
                  />
                }
              />
              <Route path="/pages" render={() =>
                  <Pages
                      appState={this.props.appState}
                      actions={this.props.actions}
                      projectData={this.props.projectData}
                  />
                }
              />
              <Route path="/messages" render={() =>
                  <Messages
                      appState={this.props.appState}
                      actions={this.props.actions}
                      projectData={this.props.projectData}
                  />
                }
              />
              <Route path="/page" render={() =>
                  <Page
                      appState={this.props.appState}
                      actions={this.props.actions}
                      projectData={this.props.projectData}
                  />
              }
              />
            </div>
          </div>
        </Router>
    )
  }
}

Project.displayName = 'Project';

export default Project;
