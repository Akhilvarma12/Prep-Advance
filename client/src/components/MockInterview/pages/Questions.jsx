import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Tabs, Tab, Typography, Box } from "@mui/material";
import Webcam from "react-webcam";

const StartInterview = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [webcamOn, setWebcamOn] = useState(location.state?.webcamOn || false); 
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const { response } = location.state;
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    try {
      // Remove backticks and other invalid characters from the response string
      const cleanedResponse = response.replace(/```json|```/g, "").trim();
      const parsedQuestions = JSON.parse(cleanedResponse);
      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
  }, [response]);

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        value={activeQuestionIndex}
        onChange={(e, index) => setActiveQuestionIndex(index)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {questions.map((_, index) => (
          <Tab key={index} label={`Question #${index + 1}`} />
        ))}
      </Tabs>

      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        <Box flex={1}>
          {questions.length > 0 && (
            <>
              <Typography variant="h5">
                {questions[activeQuestionIndex]?.Question}
              </Typography>
              <Box
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  backgroundColor: "#f5f5f5",
                  borderLeft: "5px solid #2196f3",
                  borderRadius: "5px",
                }}
              >
                
              </Box>
            </>
          )}
        </Box>

        <Box flex={1} textAlign="center">
          {webcamOn ? (
            <Webcam style={{ width: "100%", height: "200px", borderRadius: "10px" }} />
          ) : (
            <Box
              style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/61/61205.png"
                alt="Webcam"
                style={{ width: "50px", opacity: 0.5 }}
              />
            </Box>
          )}
          <Button
            variant="contained"
            color={webcamOn ? "secondary" : "primary"}
            onClick={() => setWebcamOn(!webcamOn)}
            style={{ marginTop: "15px", width: "100%" }}
          >
            {webcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
          </Button>

          <Button
            variant="contained"
            color={microphoneOn ? "secondary" : "primary"}
            onClick={() => setMicrophoneOn(!microphoneOn)}
            style={{ marginTop: "15px", width: "100%" }}
          >
            {microphoneOn ? "Turn Off Microphone" : "Turn On Microphone"}
          </Button>

          <Button
            variant="contained"
            style={{ marginTop: "15px", width: "100%" }}
            color="success"
          >
            Record Answer
          </Button>
        </Box>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "10px" }}>
        {activeQuestionIndex > 0 && (
          <Button
            variant="contained"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex < questions.length - 1 ? (
          <Button
            variant="contained"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        ) : (
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/dashboard/interview/feedback")}
          >
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
