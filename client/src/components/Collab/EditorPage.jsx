import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
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

      const handleError = (err) => {
        console.log("socket error :", err);
        toast.error("Socket connection failed");
        navigate("/dashboard/collab");
      };

      socketRef.current.on("connect_error", handleError);
      socketRef.current.on("connect_failed", handleError);

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
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on("disconnected", ({ socketId, username }) => {
        toast.success(`${username} left`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
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

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy Room ID");
    }
  };

  const leaveRoom = () => {
    navigate("/dashboard/collab");
  };

  return (
    <Box sx={{ height: "100vh", bgcolor: "#181818" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Sidebar */}
        <Grid item xs={12} md={2}>
          <Paper
            sx={{
              height: "100%",
              backgroundColor: "#1f1f1f",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              boxShadow: 3,
              borderRight: "1px solid #333",
            }}
            square
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                Members
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: "#444" }} />
              <Stack spacing={1}>
                {clients.map((client) => (
                  <Client key={client.socketId} username={client.username} />
                ))}
              </Stack>
            </Box>

            <Box mt={4}>
              <Stack spacing={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  onClick={copyRoomId}
                >
                  Copy Room ID
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  onClick={leaveRoom}
                >
                  Leave Room
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Editor Section */}
        <Grid item xs={12} md={10}>
          <Box sx={{ p: 2, height: "100%", bgcolor: "#121212" }}>
            <CodeEditor
              socketRef={socketRef}
              roomId={roomId}
              onCodeChange={(code) => (codeRef.current = code)}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditorPage;
