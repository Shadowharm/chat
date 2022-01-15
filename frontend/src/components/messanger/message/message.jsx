import React from "react";
import "./index.css";

const Message = (props) => {
  let className = `mess ${props.mess.sender}`;
  
  return (
    <div className={className}>
      <div className="content">
        <div className="date">{props.mess.date}</div>
        <div className="text">{props.mess.title}</div>
      </div>
    </div>
  );
};

export default Message;
