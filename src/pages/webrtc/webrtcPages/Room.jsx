import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useSocket } from "../context/ScoketProvider";
import ReactPlayer from "react-player";
import peer from "../Peer";
import { useNavigate } from "react-router-dom";
import "./Room.css"; 
import { useSelector } from "react-redux";

export default function Room() {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoin = useCallback(({ name, id }) => {
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [socket, remoteSocketId]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("call accepted");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoin);
    socket.on("incomming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socket.off("user:joined", handleUserJoin);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    handleUserJoin,
    socket,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoNeedFinal,
  ]);

  return (
    <Layout>
      <div className="video-container">
        <h4 className="status-text">{remoteSocketId ? "Connected" : "Not Connected"}</h4>

        <div className="video-column">
          {myStream && (
            <div className="video-wrapper">
              <h5>My Stream</h5>
              <ReactPlayer playing muted height="100%" width="100%" url={myStream}  />
            </div>
          )}
          {remoteStream && (
            <div className="video-wrapper">
              <h5>Remote Stream</h5>
              <ReactPlayer playing  height="100%" width="100%" url={remoteStream} />
            </div>
          )}
        </div>
      </div>

      <div className="button-container">
        {myStream && <button onClick={sendStreams} className="btn btn-primary">Send</button>}
        {remoteSocketId && (
          <button onClick={handleCallUser} className="btn btn-outline-primary">Start Session</button>
        )}
      </div>

      <div className="chat-end-container">
        {user.isDoctor? <textarea className="chat-area" placeholder="Session Nots"></textarea>:""}
        <button onClick={() => navigate('/video')} className="btn btn-outline-danger end-session-btn">End Session</button>
      </div>
    </Layout>
  );
}
