import React from "react";
import "./index.css";

const Head = (props) => {
  
  
  return (
    <div className="head">
      <div></div>
      <div id="typing">{props.typingText}</div>
    </div>
  );
};

export default Head;
