import React from 'react';
import fetch from "isomorphic-fetch";

class MessageForm extends React.Component {

  constructor() {
    super();
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.state = {
      messageStatus: "",
      message: ""
    }
  }

  static formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return {
      date: year + '-' + (monthIndex+1) + '-' + day,
      time: hour + ':' + minutes
    };
  }

  handleChangeMessage(e) {
    this.setState({message:e.target.value});
  }

  handleSendMessage(e) {
    e.preventDefault();
    const endpoint = `${this.props.apiURL}/addMessage.php`;
    const formData = new FormData();
    const dateTime = MessageForm.formatDate(new Date());
    formData.append('message', this.state.message);
    formData.append('projectId', this.props.projectId);
    formData.append('type', 'designer');
    formData.append('date', dateTime.date);
    formData.append('time', dateTime.time);
    if(this.state.message.length > 0) {
      fetch(endpoint, {
        method: 'POST',
        body: formData
      }).then(response => response.json()).then((response) => {
        this.props.actions.addMessage(dateTime, this.state.message);
        this.setState({
          messageStatus: response,
          info: "The message has been sent",
          message: ""
        });
      }).catch(() => {
        this.setState({messageStatus: "error", info: "An error occured. Contact the administrator."});
      });
    } else {
      this.setState({messageStatus: "error", info: "The message can not be empty"})
    }
  }

  render() {
    return (
        <div className="row justify-content-center">
          {this.state.messageStatus ? (
              <div className="col-11 col-sm-10 col-md-9 col-lg-8 ml-sm-3, ml-md-5 p-0">
                {this.state.messageStatus === "success" ?
                    (
                      <div className="text-success">{this.state.info}</div>
                    ) :
                    (
                      <div style={{color: "red"}}>{this.state.info}</div>
                    )}
              </div>
          ) : null}
          <div className="col-11 col-sm-10 col-md-9 col-lg-8 ml-sm-3, ml-md-5 p-0">
            <form onSubmit={this.handleSendMessage}>
              <textarea name="message" className="form-control" style={{height: "100px"}}
                        value={this.state.message}
                        onChange={this.handleChangeMessage}
              />
              <div className="text-right mt-3">
                <input type="submit" value="Submit" className="btn btn-primary"/>
              </div>
            </form>
          </div>
        </div>
    )
  }
}

MessageForm.displayName = 'MessageForm';

export default MessageForm;
