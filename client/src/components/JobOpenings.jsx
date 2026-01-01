import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

// Static job data
const jobData = [
  {
    id: 1,
    website:"https://careers.google.com/",
    companyLogo: "data:image/png;base64,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",
    companyName: "Google",
    companyDetails: "Data products for sales, marketing, finance, recruiting, and more.",
    jobRole: "Junior Software Engineers — No Degree Required, Self-Taught & Hobbyists Welcome!",
    jobType: "Full-time",
    location: "Remote",
    category: "Full stack",
    postedTime: "14 minutes ago",
  },
  {
    id: 2,
    website:"https://www.amazon.jobs/en/",
    companyLogo: "data:image/png;base64,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",
    companyName: "Amazon",
    companyDetails: "Replo helps companies sell more on the internet.",
    jobRole: "Software Engineer, New Grad (Dec 2024 Only)",
    jobType: "Full-time",
    location: "San Francisco",
    category: "Full stack",
    postedTime: "16 minutes ago",
  },
  {
    id: 3,
    website:"https://careers.microsoft.com/v2/global/en/home.html",
    companyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAn1BMVEX///9+ugDyUCMBpO7/uQL/uQHyTiD//vr7/fP42dD//PX++/L++ff75uH6/PW04/nd8vr84aPylH3E3ZXL6Pj93ZLy+v3yoY292obwZjnM4KOHvhrxShmQwiTg7cX96LI3su/+wzZwxPH+vhgYqu2U0/Px9+P87uv0sZ/2w7XvXy3ufFGZxjf54NXo9fv+9uBKuu6BzPH9yEOl2fX+8NCHzx1vAAABy0lEQVR4nO3b2U7CUBSFYay0FQQRmQSVQRQcwYH3fzalJRLuDAvrysn/hWiisfHP7j53p1QCAAAAAAD4VqvWRPlz0hNVKrfMH3qix3nWMrwUtYZyTeXpWnRRz2IGR6Kr1pkc00/WovUnSvKvUfLz2f5w9/fbP4m8YiIFMcQQQwwxxBBDDDHEEEMMMcQQQwwxxBBDDDHEEEMMMcQQQwwxxBBDDDHEEEMMMcQQQwwxxBBDDDHEEEPM/jHqlZPEKea5L+ptYm5ELwM5pvZaEdXze1qzoWqm39MC8E9Slf4vLBqqdjd70HKkWsox7bex6P18/Zx0NBF9NKtyzPhYdJvHNMuxpDztEPNXMWWJW0y8+ex++90P4pBi7CajYDKuMXaT4TRznQw74xrD0ew6maAOAI5m18kEtTOcZq6TCWpnOM14zQqI4TVznQw74zoZdobXrIAYXjPXyQS1Mwom4xpjNxlOM9fJBLUznGauk2FnXCfDzrhOJqidkbjFBDWZoHaG14zXrIAYBZNxjbGbDKeZ62TYGdcYjmbPyWRrvLfDxNyJNvdnmlPRRI9ZfN6LGtnNpnTVUa30i1pdWf6c9FTFnVMAAAAAAAAAABCELyOtgV0jetYwAAAAAElFTkSuQmCC",
    companyName: "Microsoft",
    companyDetails: "Replo helps companies sell more on the internet.",
    jobRole: "Software Engineer, New Grad (Dec 2024 Only)",
    jobType: "Full-time",
    location: "San Francisco",
    category: "Full stack",
    postedTime: "16 minutes ago",
  },
  {
    id: 4,
    website:"https://careers.google.com/",
    companyLogo: "https://via.placeholder.com/40",
    companyName: "Replo",
    companyDetails: "Replo helps companies sell more on the internet.",
    jobRole: "Software Engineer, New Grad (Dec 2024 Only)",
    jobType: "Full-time",
    location: "San Francisco",
    category: "Full stack",
    postedTime: "16 minutes ago",
  },
];

// Apply click handler
const handleApplyClick = (website) => {
  window.open(website, "_blank");
};

const JobOpenings = () => {
  return (
    <Box sx={{ py: 4, maxWidth: "900px", mx: "auto" }}>
      <Typography
        variant="h4"
        align="center"
        fontWeight={600}
        gutterBottom
      >
        Latest Job Openings
      </Typography>

      <Grid container spacing={3}>
        {jobData.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #eaeaea",
                transition: "all 0.25s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {/* LEFT CONTENT */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                  <Avatar
                    src={job.companyLogo}
                    alt={job.companyName}
                    sx={{
                      width: 56,
                      height: 56,
                      border: "1px solid #ddd",
                      bgcolor: "#fff",
                    }}
                  />

                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      {job.companyName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      {job.companyDetails}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, mb: 0.5 }}
                    >
                      {job.jobRole}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 0.5 }}>
                      <Chip label={job.jobType} size="small" />
                      <Chip label={job.location} size="small" />
                      <Chip label={job.category} size="small" />
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      Posted {job.postedTime}
                    </Typography>
                  </Box>
                </Box>

                {/* RIGHT ACTION */}
                <Button
                  variant="contained"
                  color="warning"
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                  onClick={() => handleApplyClick(job.website)}
                >
                  Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default JobOpenings;