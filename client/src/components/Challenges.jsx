import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  Button,
  Stack,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const challenges = [
  {
    id: 1,
    title: 'xAGI Entrepreneur-in-Residence Challenge',
    organizer: 'xAGI',
    applied: 67,
    daysLeft: 7,
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/679215df1bacd_organisation_image-y7fYKuWZpo588605852o0jl7PkD9s.png?d=200x200',
    tags: ['Online', 'Free'],
  },
  {
    id: 2,
    title: 'OutThink 2025',
    organizer: 'Larsen & Toubro Limited (L&T)',
    applied: 1486,
    daysLeft: 11,
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-67878585411ef_out-think-logo-150-x-150.png?d=200x200',
    tags: ['Online', 'Free'],
  },
  {
    id: 3,
    title: 'CreaTech 2025',
    organizer: 'Larsen & Toubro',
    applied: 1555,
    daysLeft: 11,
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-6774d12a780ee_createch-logo-150px-x-150px.png?d=200x200',
    tags: ['Online', 'Free'],
  },
  {
    id: 4,
    title: 'Road Safety Hackathon',
    organizer: 'National Highways Authority of India',
    applied: 18014,
    daysLeft: 14,
    image: 'https://static.mygov.in/innovateindia/2021/11/mygov-1000000000761638518-1536x427.jpg',
    tags: ['Online', 'Free'],
  },
];

const Challenges = () => {
  return (
    <Box sx={{ px: 2, py: 3 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={700}>
          Hiring Challenges
        </Typography>

        <Button
          variant="text"
          endIcon={<ArrowForwardIosIcon fontSize="small" />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          View All
        </Button>
      </Box>

      {/* Cards */}
      <Grid container spacing={3}>
        {challenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={challenge.id}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Logo / Banner */}
              <Box
                sx={{
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f7fa',
                }}
              >
                <CardMedia
                  component="img"
                  image={challenge.image}
                  alt={challenge.title}
                  sx={{
                    maxHeight: 80,
                    maxWidth: '70%',
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <CardContent>
                {/* Tags */}
                <Stack direction="row" spacing={1} mb={1}>
                  {challenge.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        backgroundColor: '#eef2ff',
                        color: '#3730a3',
                      }}
                    />
                  ))}
                </Stack>

                {/* Title */}
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  gutterBottom
                  noWrap
                >
                  {challenge.title}
                </Typography>

                {/* Organizer */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                >
                  {challenge.organizer}
                </Typography>

                {/* Footer Stats */}
                <Box
                  mt={2}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography variant="caption" fontWeight={600}>
                    {challenge.applied} Applied
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="error.main"
                  >
                    {challenge.daysLeft} days left
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Challenges;
