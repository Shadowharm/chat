import React, { useEffect, useState } from "react";
import Head from "../head/head.jsx";
import Messanger from "../messanger/messanger.jsx";
import EntryField from "../entryField/entryField.jsx";
import LogIn from "../logIn/logIn.jsx";
import SignUp from "../signUp/signUp.jsx";
import "./index.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/");
const App = () => {
  let [messages, setMes] = useState([]);
  let [typingText, setText] = useState("");
  useEffect(() => {
    socket.on("add", (data) => {
      if (data.sender === socket.id) {
        data.sender = "s1";
      } else {
        data.sender = "s2";
      }
      setMes((prev) => [...prev, data]);
    });
    socket.on("a", () => {
      setText("Typing...");
    });
    socket.on("b", () => {
      setText("");
    });
  }, []);
  const sendMess = (value) => {
    let newMess = {
      date: new Date().toLocaleTimeString(),
      title: value,
      sender: "",
    };
    socket.emit("send", newMess);
  };

  const typing = () => {
    socket.emit("typing");
  };
  const noTyping = () => {
    socket.emit("noTyping");
  };

  return (
    <div className="wrap">
      <div className="dialogs"></div>
      <div className="app">
        <Head typingText={typingText} />
        <Messanger messes={messages} />
        <EntryField sendMess={sendMess} typing={typing} noTyping={noTyping} />
      </div>
      <div className="right">
        <LogIn />
        <SignUp />
      </div>
    </div>
  );
};

export default App;
