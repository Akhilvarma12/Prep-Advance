import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Button
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


const Roadmap = () => {
  const location = useLocation();

  // SAFE access to route state
  const roadmap = location.state?.roadmap ?? "";
  const role = location.state?.role ?? "";

const [roadmaps, setRoadmaps] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


useEffect(() => {
  if (!roadmap || typeof roadmap !== "string") {
    setError("No roadmap data received.");
    setLoading(false);
    return;
  }

  try {
    const cleaned = roadmap
      .replace(/```json|```/g, "")
      .trim();

    if (!cleaned.startsWith("{") || !cleaned.endsWith("}")) {
      throw new Error("Incomplete JSON received");
    }

    const parsed = JSON.parse(cleaned);

    if (!parsed.roadmap || typeof parsed.roadmap !== "object") {
      throw new Error("Invalid roadmap structure");
    }

    setRoadmaps(parsed);
  } catch (err) {
    console.error("Roadmap parsing error:", err);
    setError(
      "Failed to generate roadmap. AI response was incomplete. Please try again."
    );
  } finally {
    setLoading(false); // 🔑 THIS IS THE KEY
  }
}, [roadmap]);



  // Error UI
if (error) {
  return (
    <Box textAlign="center" sx={{ mt: 4 }}>
      <Typography color="error" gutterBottom>
        {error}
      </Typography>

      <Button
        variant="contained"
        onClick={() => window.location.reload()}
      >
        Regenerate Roadmap
      </Button>
    </Box>
  );
}


  // Loading UI
  if (!roadmaps) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        Loading...
      </Typography>
    );
  }

  const listStyles = {
    padding: 0,
    "& .MuiListItem-root": {
      padding: "2px 0",
    },
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        Placement Preparation Roadmap for <br /> {role || "Selected"} role
      </Typography>

      {/* Phases */}
      {Object.keys(roadmaps.roadmap || {}).map((phaseKey, index) => {
        const phase = roadmaps.roadmap[phaseKey];

        return (
          <React.Fragment key={index}>
            <Card
              variant="outlined"
              sx={{
                marginBottom: 4,
                position: "relative",
                borderRadius: 4,
                boxShadow: 3,
                overflow: "visible",
                padding: 3,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#1976d2", fontWeight: "bold" }}
                >
                  Phase {index + 1}: {phase?.duration}
                </Typography>

                {/* Topics */}
                {phase?.topics?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Topics:</Typography>
                    <List sx={listStyles}>
                      {phase.topics.map((topic, idx) => (
                        <ListItem key={idx}>
                          <ListItemText
                            primaryTypographyProps={{
                              variant: "body2",
                              component: "span",
                            }}
                            primary={`• ${topic}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Projects */}
                {phase?.projects?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">Projects:</Typography>
                    <List sx={listStyles}>
                      {phase.projects.map((project, idx) => (
                        <ListItem key={idx}>
                          <ListItemText
                            primaryTypographyProps={{
                              variant: "body2",
                              component: "span",
                            }}
                            primary={`• ${project}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Resources */}
                {phase?.resources && (
                  <Box>
                    {phase.resources.courses?.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6">Courses:</Typography>
                        <List sx={listStyles}>
                          {phase.resources.courses.map((course, idx) => (
                            <ListItem key={idx}>
                              <ListItemText
                                primaryTypographyProps={{
                                  variant: "body2",
                                  component: "span",
                                }}
                                primary={`• ${course}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {phase.resources.youtube?.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6">YouTube Resources:</Typography>
                        <List sx={listStyles}>
                          {phase.resources.youtube.map((yt, idx) => (
                            <ListItem key={idx}>
                              <ListItemText
                                primaryTypographyProps={{
                                  variant: "body2",
                                  component: "span",
                                }}
                                primary={`• ${yt}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {phase.resources.websites?.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6">Websites:</Typography>
                        <List sx={listStyles}>
                          {phase.resources.websites.map((website, idx) => (
                            <ListItem key={idx}>
                              <ListItemText
                                primaryTypographyProps={{
                                  variant: "body2",
                                  component: "span",
                                }}
                                primary={`• ${website}`}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Arrow between phases */}
            {index < Object.keys(roadmaps.roadmap).length - 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <ArrowDownwardIcon fontSize="large" color="primary" />
              </Box>
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default Roadmap;
