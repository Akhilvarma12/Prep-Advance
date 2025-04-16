import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const PlacementPreparation = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", marginTop:"20px", minHeight: "100vh" }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Preparing for Placement?
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", marginBottom: 4 }}
          >
            Our Complete Placement Preparation Masterclass is here to help you.
          </Typography>
          <Box>
            <Button
              variant="contained"
              component={Link} // Use the Link component for routing
              to="/dashboard" // Redirects to the dashboard
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                fontSize: "16px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Start Preparation
            </Button>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://www.talentbattle.in/_next/image?url=https%3A%2F%2Fmedia.talentbattle.in%2FFiles%2FC4U_Images%2FC4U_SITE_IMAGES%2F218%2Fhero%20new.png&w=640&q=75" // Replace with the correct image path
            alt="Placement Features"
            sx={{ width: "100%", maxWidth: 400, margin: "0 auto", marginLeft:"60px" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlacementPreparation;
