import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getResponse } from "../../api/gemini";
import { slugify } from "../../lib/utils";

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

/**
 * Utility: validate AI JSON before navigation
 */
const isValidJSON = (text) => {
  if (!text || typeof text !== "string") return false;
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
};

const RoadmapInput = () => {
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!role || !duration) {
      alert("Please provide both Role and Duration.");
      return;
    }

    setLoading(true);

    try {
      const prompt = `
Generate a ${duration}-day preparation roadmap for the role "${role}".

CRITICAL RULES (MANDATORY):
- Return ONLY valid, complete, parsable JSON
- Output must START with { and END with }
- All arrays, objects, and strings MUST be closed
- Do NOT include markdown, explanations, or extra text
- If you cannot complete the JSON, DO NOT respond

STRUCTURE REQUIREMENTS:
- Divide roadmap into 4–5 phases
- Each phase must include:
  - duration (string)
  - topics (max 5 items)
  - projects (max 2 items)
  - resources:
    - youtube (max 3 channel names)
    - courses (max 2 course names)
    - websites (max 3 websites)

- Include DSA only if relevant to the role
- All resources must be free

JSON STRUCTURE (STRICT):

{
  "roadmap": {
    "phase_1": {
      "duration": "",
      "topics": [],
      "projects": [],
      "resources": {
        "youtube": [],
        "courses": [],
        "websites": []
      }
    }
  },
  "final_resources": {
    "youtube_channels": [],
    "certifications": [],
    "websites": []
  }
}
`;

      const roadmap = await getResponse(prompt);

      // HARD SAFETY CHECK — DO NOT NAVIGATE WITH INVALID JSON
      if (!isValidJSON(roadmap)) {
        alert("AI response was incomplete. Please try again.");
        return;
      }

      const slugifiedRole = slugify(role);

      navigate(`/dashboard/roadmap/${slugifiedRole}`, {
        state: {
          roadmap,
          role,
        },
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Create Your Placement Roadmap
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Autocomplete
          freeSolo
          options={rolesList}
          value={role}
          onChange={(_, newValue) => setRole(newValue || "")}
          onInputChange={(_, newInputValue) => setRole(newInputValue)}
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
          onClick={handleGenerate}
          disabled={loading}
          sx={{
            textTransform: "none",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </Button>
      </Box>
    </Container>
  );
};

export default RoadmapInput;
