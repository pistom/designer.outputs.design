import React from 'react';

class MainMenu extends React.Component {

  handleSelectStep(step) {
    this.props.actions.selectStep(step);
  }

  render() {
    let deviceIsSet = Object.keys(this.props.projectData.devices).length > 0;
    let backgroundIsSet = Object.keys(this.props.projectData.backgrounds).length > 0;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a
              href="#home"
              onClick={() => this.handleSelectStep("home")}
              className="navbar-brand"
          >Outputs.design</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a
                  href="#home"
                  onClick={() => this.handleSelectStep("home")}
                  className="nav-item nav-link"
              >
                Project info
              </a>
              <a
                  href="#backgrounds"
                  onClick={() => this.handleSelectStep("backgrounds")}
                  className="nav-item nav-link"
              >
                Backgrounds
              </a>
              <a
                  href="#devices"
                  onClick={() => (backgroundIsSet) ? this.handleSelectStep("devices") : null}
                  className={(!backgroundIsSet) ? "nav-item nav-link disabled" : "nav-item nav-link"}
              >
                Devices
              </a>
              <a
                  href="#pages"
                  onClick={() => (deviceIsSet && backgroundIsSet) ? this.handleSelectStep("pages") : null}
                  className={!(deviceIsSet && backgroundIsSet) ? "nav-item nav-link disabled" : "nav-item nav-link"}
              >
                Pages
              </a>
              <a
                  href="#messages"
                  onClick={() => this.handleSelectStep("messages")}
                  className="nav-item nav-link"
              >
                Messages
              </a>
            </div>
          </div>
        </nav>
    );
  }
}

MainMenu.displayName = 'Main menu';

export default MainMenu;
