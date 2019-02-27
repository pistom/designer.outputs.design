import React from 'react';
import Message from './Message'
import MessageForm from './MessageForm'

class Messages extends React.Component {

  render() {
    return [
      <h1 key="title">Messages</h1>,
      <div key="messages">
        {this.props.messages ?
            Object.keys(this.props.messages).map(message => (
                <Message key={message} message={this.props.messages[message]}/>
            )) : null
        }
      </div>,
      <hr key="divider"/>,
      <MessageForm key="form"
                   actions={this.props.actions}
                   projectId={this.props.projectData.projectId}
                   apiURL={this.props.appState.apiURL}
      />
    ]

  }
}

Messages.displayName = 'Messages';

export default Messages;
