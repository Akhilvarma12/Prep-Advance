import React, { useState } from "react";
import "../../index.css";
import { Pointer } from "lucide-react";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CollabHome() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const navigate=useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Room Id is generated");
  };
  const joinRoom=()=>{
    if(!roomId || !username){
      toast.error("Both the fields are required")
      return
    }
    navigate(`/dashboard/collab/${roomId}`,{
      state:{username}
     })
     toast.success('Room is created')
    }
  return (
    <div
      className="collab-home"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="room-form">
        <h4>Enter the room ID</h4>
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Room Id"
        />
        <input 
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        type="text"
        placeholder="Username" />
        <button onClick={joinRoom}>Join </button>
        <p className="mt-3">
          Dont have a room Id?
          <span style={{ cursor: "pointer" }} onClick={generateRoomId} value>
            New Room
          </span>
        </p>
      </div>
    </div>
  );
}

export default CollabHome;
