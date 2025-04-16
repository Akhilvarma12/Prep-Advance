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
    <Box sx={{ padding: '20px' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Hiring Challenges
        </Typography>
        <Button
          variant="text"
          endIcon={<ArrowForwardIosIcon />}
          sx={{ textTransform: 'none' }}
        >
          View All
        </Button>
      </Box>
      <Grid container spacing={3}>
        {challenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={challenge.id}>
            <Card sx={{ height: '100%', cursor: 'pointer', boxShadow: 3 }}>
              <CardMedia
                component="img"
                alt={challenge.title}
                height="140"
                image={challenge.image}
              />
              <CardContent>
                <Box display="flex" gap={1} mb={1}>
                  {challenge.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: '#e0f7fa',
                        color: '#006064',
                        fontWeight: 'bold',
                      }}
                    />
                  ))}
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ mb: 0.5 }}
                  noWrap
                >
                  {challenge.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {challenge.organizer}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Typography variant="body2">
                    👥 {challenge.applied} Applied
                  </Typography>
                  <Typography variant="body2">
                    ⏳ {challenge.daysLeft} days left
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
