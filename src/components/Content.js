import React from 'react';
import Home from './Home'
import Devices from './Devices'
import Backgrounds from './Backgrounds'
import Pages from './Pages'
import Page from './Page'
import Messages from './Messages'

class Content extends React.Component {

  render() {
    let Content;
    let contentKey;
    switch (this.props.appState.selectedStep) {
      case 'backgrounds':
        Content = Backgrounds;
        contentKey = "Backgrounds";
        break;
      case 'devices':
        Content = Devices;
        contentKey = "Devices";
        break;
      case 'pages':
        Content = Pages;
        contentKey = "Pages";
        break;
      case 'messages':
        Content = Messages;
        contentKey = "Messages";
        break;
      case 'page':
        Content = Page;
        contentKey = "Page";
        break;
      default:
        Content = Home;
        contentKey = "Home";
    }
    return (
        <div className="container mt-3">
          {React.createElement(Content, {
            key: contentKey,
            appState: this.props.appState,
            actions: this.props.actions,
            projectData: this.props.projectData
          })}
        </div>
    );
  }
}

Content.displayName = 'Content';

export default Content;
