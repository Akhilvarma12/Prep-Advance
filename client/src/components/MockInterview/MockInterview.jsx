import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getResponse } from "../../api/gemini";
import useStore from "../../store/store";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState("");
  const navigate = useNavigate();

  const {
    setJobDesci,
    setJobExperiences,
    setJobPositions,
  } = useStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setJobDesci(jobDesc);
    setJobExperiences(jobExperience);
    setJobPositions(jobPosition);

    const inputPrompt = `
      Job Position: ${jobPosition},
      Job Description: ${jobDesc},
      Years of Experience: ${jobExperience}.
      Based on this information, please provide 5 interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
    `;

    try {
      const response = await getResponse(inputPrompt)
      navigate("/dashboard/interview/start", {
        state: { response, jobPosition, jobDesc, jobExperience },
      });

      setGeneratedQuestions(response);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f5f5f5" }}>
      <Typography variant="h3" align="center" gutterBottom style={{ marginBottom: "20px", color: "#2d2d2d" }}>
        Ace Your Next Interview
      </Typography>
      <Typography variant="h6" align="center" style={{ marginBottom: "40px", color: "#555" }}>
        Practice with AI-powered mock interviews and get personalized feedback
      </Typography>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          style={{ padding: "10px 30px", fontSize: "16px", borderRadius: "8px" }}
        >
          Get Started
        </Button>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Tell us more about your job interview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add details about your job position, job description, and years of experience.
          </DialogContentText>
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Job Role / Job Position"
              placeholder="Ex. Full Stack Developer"
              required
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Job Description / Tech Stack (In Short)"
              placeholder="Ex. React, Angular, Node.js, MySQL, NoSQL, Python"
              required
              multiline
              rows={4}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Years of Experience"
              placeholder="Ex. 5"
              required
              type="number"
              inputProps={{ max: 50 }}
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
            />
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={loading}
                variant="contained"
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} />
                    Generating...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
