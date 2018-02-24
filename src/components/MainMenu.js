import React from 'react';
import {Link} from 'react-router-dom';

class MainMenu extends React.Component {

  handleSelectStep(step) {
    this.props.actions.selectStep(step);
  }

  render() {
    let deviceIsSet = Object.keys(this.props.projectData.devices).length > 0;
    let backgroundIsSet = Object.keys(this.props.projectData.backgrounds).length > 0;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <Link
              to="/"
              onClick={() => this.handleSelectStep("home")}
              className="navbar-brand"
          >Outputs.design</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mr-auto">
              <Link
                  to="/"
                  onClick={() => this.handleSelectStep("home")}
                  className="nav-item nav-link"
              >
                Project info
              </Link>
              <Link
                  to="/backgrounds"
                  onClick={() => this.handleSelectStep("backgrounds")}
                  className="nav-item nav-link"
              >
                Backgrounds
              </Link>
              <Link
                  to="/devices"
                  onClick={() => (backgroundIsSet) ? this.handleSelectStep("devices") : null}
                  className={(!backgroundIsSet) ? "nav-item nav-link disabled" : "nav-item nav-link"}
              >
                Devices
              </Link>
              <Link
                  to="/pages"
                  onClick={() => (deviceIsSet && backgroundIsSet) ? this.handleSelectStep("pages") : null}
                  className={!(deviceIsSet && backgroundIsSet) ? "nav-item nav-link disabled" : "nav-item nav-link"}
              >
                Pages
              </Link>
              <Link
                  to="/messages"
                  onClick={() => this.handleSelectStep("messages")}
                  className="nav-item nav-link"
              >
                Messages
              </Link>
            </div>

            <div className="form-inline my-2 my-lg-0">
                <Link
                    to="/"
                    className="btn btn-outline-secondary btn-sm my-2 my-sm-0"
                    onClick={this.props.actions.logout}
                >
                  Logout
                  <i className="mi mi-directions-run ml-1"/>
                </Link>
            </div>

          </div>
        </nav>
    );
  }
}

MainMenu.displayName = 'Main menu';

export default MainMenu;
