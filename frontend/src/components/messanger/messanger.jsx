import React, { useEffect } from "react";
import "./index.css";
import Message from "./message/message";

const Messanger = (props) => {
  useEffect(() => {
    document.getElementById("scroll").lastChild.scrollIntoView(true);
  });

  return (
    <div className="area">
      <div className="messes" id="scroll">
        <div></div>
        {props.messes.map((mess) => {
          return <Message mess={mess} key={mess.date} />;
        })}
      </div>
    </div>
  );
};

export default Messanger;
