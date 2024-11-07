import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/ScoketProvider";
import "./VideoInput.css";

export default function VideoInput({ name }) {
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { name, room });
    },
    [room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="video-input-container">
      <form onSubmit={handleSubmit} className="video-input-form">
        <p className="name-label">Name: {name}</p>
        <label htmlFor="room" className="room-label">
          Room ID:
        </label>
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          type="text"
          name="room"
          className="room-input"
          placeholder="Enter Room ID"
        />
        <button type="submit" className="start-session-btn">
          Start Session
        </button>
      </form>
    </div>
  );
}
