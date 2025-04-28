import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import Client from "./Client";
import CodeEditor from "./CodeEditor";
import { initSocket } from "../../Socket";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

function EditorPage() {
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleError(err));
      socketRef.current.on("connect_failed", (err) => handleError(err));

      const handleError = (err) => {
        console.log("socket error :", err);
        toast.error("Socket conection failed");
        navigate("/dashboard/collab");
      };

      socketRef.current.emit("join", {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on("joined", ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined`);
        }
        setClients(clients);
        socketRef.current.emit("sync-code", {
          code:codeRef.current,
          socketId,
        });
      });
      // disconnected
      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left`);
        setClients((prev) => {
          //display all except the one leaving
          return prev.filter((client) => client.socketId != socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
    };
  }, []);

  if (!location.state) {
    return <Navigate to="/dashboard/collab" />;
  }

  const copyRoomId=async()=>{
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('roomId is copied')
    } catch (error) {
      toast.error('Unable to copy roomId ')
    }
  }

  const leaveRoom=async()=>{
    navigate('/dashboard/collab')
  }

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} md={2}>
          <Paper
            sx={{
              height: "100%",
              backgroundColor: "primary.dark",
              color: "white",
              display: "flex",
              flexDirection: "column",
              p: 2,
            }}
            square
          >
            <Typography variant="h6">Member</Typography>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
            <div style={{ marginTop: 300 }}>
              <button onClick={copyRoomId}>copy room id</button>
              <button onClick={leaveRoom}>Leave room</button>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={10}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">
              <CodeEditor
                socketRef={socketRef}
                roomId={roomId}
                onCodeChange={(code) => (codeRef.current = code)}
              />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditorPage;
