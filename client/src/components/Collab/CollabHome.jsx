import React, { useState } from "react";
import "../../index.css";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";

function CollabHome() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("Room Id is generated");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both the fields are required");
      return;
    }
    navigate(`/dashboard/collab/${roomId}`, {
      state: { username },
    });
    toast.success("Room is created");
  };

  return (
    <Box
      className="collab-home"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h6" gutterBottom>
          Enter the Room ID
        </Typography>

        <TextField
          fullWidth
          label="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          size="small"
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={joinRoom}
          sx={{ mt: 2 }}
        >
          Join
        </Button>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have a room ID?{" "}
          <span
            style={{ cursor: "pointer", color: "#3f51b5", fontWeight: 500 }}
            onClick={generateRoomId}
          >
            New Room
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

export default CollabHome;
