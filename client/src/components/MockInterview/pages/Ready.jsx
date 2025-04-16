import React, { useState } from "react";
import { Container, Grid, Typography, Box, Card, CardContent, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Generate UUID
import Webcam from "react-webcam"; // Webcam component

const Interview = () => {
  const navigate = useNavigate();
  const [webcamOn, setWebcamOn] = useState(false); // State to toggle webcam

  const location=useLocation();
  const {response,jobPosition,jobDesc,jobExperience}=location.state;

  // Handle Start Interview Button
  const handleStartInterview = () => {
    const uuid = uuidv4(); // Generate unique identifier
    navigate(`/dashboard/interview/start/${uuid}`, { state: { webcamOn, response } }); // Pass webcam state to the next page
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center">Let's Get Started</Typography>
      <Grid container spacing={5} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <strong>Job Description/Job Stack:</strong> {jobPosition}
              </Typography>
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                <strong>Skills:</strong> {jobDesc}
              </Typography>
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                <strong>Years of Experience:</strong> {jobExperience}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{ height: "100%" }}
          >
            {/* Webcam Toggle Section */}
            {webcamOn ? (
              <Webcam style={{ width: "100%", borderRadius: "10px" }} />
            ) : (
              <Box
                style={{
                  width: "100%",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h6" style={{ color: "#999" }}>
                  Webcam is Off
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setWebcamOn(!webcamOn)} // Toggle Webcam
              style={{ marginTop: "15px" }}
            >
              {webcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
            </Button>

            {/* Start Interview Section */}
            <Typography variant="h6" style={{ marginTop: "20px", color: "#555" }}>
              Ready to begin the interview?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartInterview}
              style={{ width: "100%" }}
            >
              Start Interview
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Interview;
