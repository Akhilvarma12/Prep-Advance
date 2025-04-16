import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { WorkOutline, Code, Group, People, Timeline } from "@mui/icons-material";

const cardData = [
  {
    title: "Placement Roadmap",
    icon: <Timeline style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "Get a personalized roadmap for your placement preparation.",
    link: "/dashboard/roadmap",
  },
  {
    title: "Collab",
    icon: <Group style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "Collaborate on exciting projects and connect with others.",
    link: "/dashboard/collab",
  },
  {
    title: "AI Mock Interviews",
    icon: <Group style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "Master mock interviews with confidence.",
    link: "/dashboard/interview",
  },
  {
    title: "Resume Builder",
    icon: <WorkOutline style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "Create professional and personalized resumes effortlessly.",
    link: "/dashboard/resume",
  },
  {
    title: "Job Openings",
    icon: <WorkOutline style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "Explore job opportunities tailored to your skills.",
    link: "/dashboard/jobs",
  },
  {
    title: "Technical Challenges",
    icon: <Code style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "Explore Coding Challenges to test your skills.",
    link: "/dashboard/challenges",
  },
  {
    title: "Top Mentors",
    icon: <People style={{ fontSize: "48px", color: "#6c63ff" }} />,
    description: "In search of excellence? Explore the highest-rated mentors.",
    link: "/dashboard/mentors",
  },
];

const Dashboard = () => {
  return (
    <div style={{ padding: "20px", marginTop: "10px", minHeight: "100vh", background: "#f9f9f9" }}>
      <Box
        textAlign="center"
        py={4}
        style={{
          background: "linear-gradient(to right, #6c63ff, #9b5ef7)",
          color: "#fff",
          borderRadius: "12px",
        }}
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold">
          What productive step will you conquer today?
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Link to={card.link} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(0, 0, 0, 0.15) 0px 0px 0px 1px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" justifyContent="center" mb={2}>
                    {card.icon}
                  </Box>
                  <Typography variant="h5" fontWeight="bold" textAlign="center">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" textAlign="center" mt={1}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;