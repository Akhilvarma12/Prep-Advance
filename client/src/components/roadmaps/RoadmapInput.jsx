import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Autocomplete,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getResponse } from "../../api/gemini";
import { slugify } from "../../lib/utils";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const durations = [
  { value: "30", label: "30 Days" },
  { value: "90", label: "3 Months" },
  { value: "180", label: "6 Months" },
  { value: "270", label: "9 Months" },
  { value: "365", label: "1 Year" },
  { value: "730", label: "2 Years" },
];

const rolesList = [
  "Software Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Product Manager",
  "UI/UX Designer",
  "Cybersecurity Analyst",
];

const sampleJSON = `
{
  "roadmap": {
    "phase_1": {
      "duration": "0-1 Month",
      "topics": ["Basic programming concepts", "Data Structures and Algorithms"],
      "projects": ["Build a simple calculator", "Create a portfolio website"],
      "resources": {
        "youtube": ["FreeCodeCamp Programming Basics", "DSA Simplified by CodeWithHarry"],
        "courses": ["Introduction to Programming on Coursera", "CS50 by Harvard"],
        "websites": ["leetcode.com", "geeksforgeeks.org"]
      }
    },
    "phase_2": {
      "duration": "2-4 Months",
      "topics": ["System Design", "Advanced Algorithms"],
      "projects": ["Develop a chat app", "Build an e-commerce website"],
      "resources": {
        "youtube": ["System Design by Gaurav Sen", "Advanced DSA by Love Babbar"],
        "courses": ["Grokking the System Design Interview", "MIT OpenCourseWare"],
        "websites": ["systemdesignprimer.com"]
      }
    },
    ...
  },
  "final_resources": {
    "youtube_channels": ["Tech With Tim", "The Net Ninja"],
    "certifications": ["AWS Certified Solutions Architect", "Google Cloud Fundamentals"],
    "websites": ["hackerrank.com", "codecademy.com"]
  }
}
`;

const RoadmapInput = () => {
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!role || !duration) {
      alert("Please provide both Role and Duration!");
      return;
    }
    console.log(duration)

    setLoading(true);

    try {
      const prompt = `generate a ${duration} days preparation roadmap for a ${role} and 3 best youtube playlists channel and 3 best course certifications  which are free with a series of projects at each phase and at the end of the roadmap.it mush contain youtube channel names and course name along with their websites name in it.It should give a breif decription of what to do in each phase.If the role uses any type of DSA then include DSA in the roadmap accordingly.

      The response must follow only this JSON format:
      ${sampleJSON}

      Provide the response strictly in the JSON format only. Do not include any additional text.`;

      const roadmap = await getResponse(prompt);

      const slugifyRole = slugify(role);

      navigate(`/dashboard/roadmap/${slugifyRole}`, { state: { roadmap, role } });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Create Your Placement Roadmap
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Autocomplete
          freeSolo
          options={rolesList}
          value={role}
          onChange={(event, newValue) => setRole(newValue)}
          onInputChange={(event, newInputValue) => setRole(newInputValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Role"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <TextField
          label="Duration"
          variant="outlined"
          select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          fullWidth
        >
          {durations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </Button>
      </Box>
    </Container>
  );
};

export default RoadmapInput;
