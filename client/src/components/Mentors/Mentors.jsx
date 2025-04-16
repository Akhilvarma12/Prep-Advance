import React from 'react';
import { Link } from 'react-router-dom';
import { CssBaseline, Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

const mentors = [
  {
    id: 1,
    name: 'Shravya Shetty',
    role: 'Full Stack Developer | Programming, MongoDB, Django',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/66e689b11a7f1.webp?d=240x240',
  },
  {
    id: 2,
    name: 'Sachin Thakur',
    role: 'Frontend Developer at ClearTax | Ex-Innovaccer',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65eebe10e502d.webp?d=240x240',
  },
  {
    id: 3,
    name: 'Shadab Imran',
    role: 'MERN Stack Developer at Hubx.ai | Programming, MongoDB, Django',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65e40fad1fece.webp?d=240x240',
  },
  {
    id: 4,
    name: 'Nusrat Gulbarga',
    role: 'Full Stack Developer | Data Analyst | Big Data & AWS Cloud Enthusiast',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65e2d4ade1037.webp?d=240x240',
  },
];


function MentorList() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Recommended Mentors <span style={{ color: '#FFD700' }}>FOR YOU</span>
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          Looking for the best of the best? Here are the top-rated mentors by the learners' community.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {mentors.map((mentor) => (
            <Grid item xs={12} sm={6} md={3} key={mentor.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  image={mentor.image}
                  alt={mentor.name}
                  sx={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: '16px auto 0',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    backgroundColor: '#007FFF',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    px: 1,
                    py: 0.5,
                    borderRadius: '4px',
                  }}
                >
                  {mentor.availability}
                </Box>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {mentor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {mentor.role}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/dashboard/mentors/${mentor.id}`}
                    variant="outlined"
                    sx={{
                      marginTop: 2,
                      textTransform: 'none',
                      borderColor: '#007FFF',
                      color: '#007FFF',
                    }}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default MentorList;
