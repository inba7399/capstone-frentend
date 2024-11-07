import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io.connect("https://capstone-backend-afk6.onrender.com");
import { useEffect, useState } from "react";

export default function Chat() {
  const { user } = useSelector((state) => state.user);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const name = user?.name;
  const room = "123";
  const roll = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  const sendMessag = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        room,
        username: name,
        roll,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((m) => [...m, messageData]);
    }
    setCurrentMessage("");
  };

  useEffect(() => {
    joinRoom();
  }, []);
  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessageList((m) => [...m, data]);
    });
  }, [socket]);

  return (
    <Layout>
      <div className="container message-container">
        <div className="my-message-colem">
          {messageList.map((message) => {
            return (
              <div className="message-box">
                <p className="message">{message.message}</p>
                <p className="name-rool">
                  {message.username}({message.roll})
                </p>
                <p className="text-time">{message.time}</p>
              </div>
            );
          })}
        </div>

        <div className="container row text-box ">
          <form>
            <div className="row">
              <div className="col-9">
                <input
                  placeholder="Send message "
                  className="form-control "
                  type="text"
                  onChange={(e) => {
                    setCurrentMessage(e.target.value);
                  }}
                  value={currentMessage}
                />
              </div>
              <div className="col-3">
                <button
                  className=" btn btn-outline-success"
                  onClick={(e) => sendMessag(e)}
                  style={{ width: "80px", marginLeft: "-12px" }}
                >
                  send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
