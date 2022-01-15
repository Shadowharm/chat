import React, { useState, useEffect } from "react";
import "./index.css";
let isTyping = false;
let timeout;
const EntryField = (props) => {
  let [text, setText] = useState();
  const change = (event) => {
    setText(event.target.value);
    if (!isTyping) {
      
      isTyping = true;
      props.typing();
    }
  };
  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      isTyping = false;
      
      props.noTyping();
    }, 1000);
  }, [text]);

  const send = () => {
    if (text) {
      props.sendMess(text);
      setText("");
    }
  };
  const subm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={subm} className="entryField">
      <input className="input" value={text} onChange={change}></input>
      <button type="submit" className="button" onClick={send}>
        SEND
      </button>
    </form>
  );
};

export default EntryField;
