import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom

const Feedback = () => {
  const navigate = useNavigate(); // Use navigate instead of useRouter
  const [feedbackList] = useState([]); // Static state for now

  const overallRating = feedbackList.length > 0 ? 7.5 : 0; // Example value

  return (
    <Box sx={{ padding: 4 }}>
      {feedbackList.length === 0 ? (
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No Interview Feedback Record Found
        </Typography>
      ) : (
        <>
          <Typography variant="h4" color="success.main" gutterBottom>
            Congratulations
          </Typography>
          <Typography variant="h5" gutterBottom>
            Here is your interview feedback
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your overall interview rating
            <strong
              style={{
                color: overallRating >= 5 ? "green" : "red",
                marginLeft: 8,
              }}
            >
              {overallRating}
              <span style={{ color: "black" }}>/10</span>
            </strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Find below interview questions with the correct answer, your answer,
            and feedback for improvement.
          </Typography>

          {feedbackList.map((item, index) => (
            <Accordion key={index} sx={{ marginTop: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography color="error">
                    <strong>Rating: </strong>
                    {item.rating}
                  </Typography>
                  <Typography
                    sx={{ backgroundColor: "#ffebee", padding: 1, borderRadius: 1 }}
                    color="error"
                  >
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </Typography>
                  <Typography
                    sx={{ backgroundColor: "#e8f5e9", padding: 1, borderRadius: 1 }}
                    color="success.main"
                  >
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </Typography>
                  <Typography
                    sx={{ backgroundColor: "#e3f2fd", padding: 1, borderRadius: 1 }}
                    color="primary"
                  >
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}

      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={() => navigate("/dashboard")} // Navigate to dashboard
      >
        Go Home
      </Button>
    </Box>
  );
};

export default Feedback;
