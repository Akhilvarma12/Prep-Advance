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
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Roadmap = () => {
  const location = useLocation();
  const { roadmap, role } = location.state;

  const [roadmaps, setRoadmaps] = useState();

  useEffect(() => {
    const cleanedString = roadmap.replace(/```json/g, "").replace(/```/g, "");
    const roadmapData = JSON.parse(cleanedString);
    setRoadmaps(roadmapData);
    console.log(roadmapData)
  }, [roadmap]);

  if (!roadmaps) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  const listStyles = {
    padding: 0,
    "& .MuiListItem-root": {
      padding: "2px 0", // Decrease gap between points
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
        Placement Preparation Roadmap for <br /> {role} role
      </Typography>

      {/* Phases */}
      {Object.keys(roadmaps.roadmap).map((phaseKey, index) => {
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
                    {/* Courses */}
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

                    {/* YouTube */}
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

                    {/* Websites */}
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

            {/* Add Arrow between phases */}
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
