import React from 'react';

const MessageInfo = props => {
  return (
      <div className="col-3 col-md-2 text-center" style={{lineHeight:"1.2em"}}>
        <div style={{fontSize:"1.8rem",lineHeight:"1.2rem", marginBottom: "1rem", fontWeight: "bold"}}>
          {props.message.type === 'client' ?
              (
                  "C"
              ) : (
                  "D"
              )}
        </div>
        <div style={{fontSize:"0.8em"}}>
          <div style={{fontWeight:"bold"}}>
            {props.message.date}
          </div>
          <div>
            {props.message.time}
          </div>
        </div>
      </div>
  )
};

const Message = props => {
  let classList = ["col-11", "col-sm-10", "col-md-9", "col-lg-8", "border", "pt-3", "pb-3"];

  if (props.message.type === 'designer') {
    classList.push("ml-sm-3", "ml-md-5", "bg-dark")
  } else {
    classList.push("mr-sm-3", "mr-md-5", "bg-light")
  }

  return (
      <div className="row justify-content-center mt-2 ">
        <div className={Array.join(classList, " ")}>
          <div className="row">
            {props.message.type === 'client' ? (
                <MessageInfo message={props.message} />
            ) : null}
            <div className="col-9 col-md-10">
              {props.message.content}
            </div>
            {props.message.type === 'designer' ? (
                <MessageInfo message={props.message} />
            ) : null}
          </div>
        </div>
      </div>
  )
};

export default Message;
