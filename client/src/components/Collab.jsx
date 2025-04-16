import React, { useState } from "react";
import CodeEditor from "./Collab/CodeEditor";
import { Box, Typography, Divider, Grid } from "@mui/material";
import Client from "./Collab/Client";

const Collab = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Akhil Varma" },
    { socketId: 2, username: "Shiva Krishna" },
    { socketId: 3, username: "John Doe" },
    { socketId: 4, username: "Jane Smith" },
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full viewport height
        margin: 0, // Ensure no outer margins
        padding: 0, // Ensure no outer paddings
        overflow: "hidden", // Prevent accidental scrollbars
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px", // Fixed width for the sidebar
          backgroundColor: "#2e2e2e", // Dark background for the sidebar
          color: "#fff", // Light text for contrast
          padding: 0, // No padding around the sidebar
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%", // Full height of the viewport
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          Collaborators
        </Typography>
        <Divider sx={{ width: "100%", my: 2, backgroundColor: "#6c63ff" }} />
        <Grid container spacing={1} sx={{ padding: 1 }}>
          {clients.map((client) => (
            <Grid
              item
              xs={6} // Each item takes half the width of the container (2 columns)
              key={client.socketId}
            >
              <Client username={client.username} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1, // Take up the remaining space
          padding: 0, // Remove padding from the editor container
          height: "100%", // Full height for the editor area
        }}
      >
        <CodeEditor />
      </Box>
    </Box>
  );
};

export default Collab;
