import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions, Avatar } from '@mui/material';
import { CalendarToday, Chat, Description, School } from '@mui/icons-material';

const mentors = [
  {
    id: 1,
    name: 'Shravya Shetty',
    role: 'Full Stack Developer | Programming, MongoDB, Django',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/66e689b11a7f1.webp?d=240x240',
    services: [
      { name: '1-1 Call', price: '₹800', time: '30 min', discount: '10% off', icon: <CalendarToday /> },
      { name: 'Quick Chat', price: '₹300', time: '15 min', discount: '5% off', icon: <Chat /> },
      { name: 'Resume Review', price: '₹600', time: '1 hr', discount: '15% off', icon: <Description /> },
      { name: 'Placement Prep', price: '₹900', time: '2 hrs', discount: '20% off', icon: <School /> },
    ],
  },
  {
    id: 2,
    name: 'Sachin Thakur',
    role: 'Frontend Developer at ClearTax | Ex-Innovaccer',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65eebe10e502d.webp?d=240x240',
    services: [
      { name: '1-1 Call', price: '₹750', time: '30 min', discount: '5% off', icon: <CalendarToday /> },
      { name: 'Quick Chat', price: '₹400', time: '15 min', discount: '5% off', icon: <Chat /> },
      { name: 'Resume Review', price: '₹650', time: '1 hr', discount: '10% off', icon: <Description /> },
      { name: 'Placement Prep', price: '₹850', time: '2 hrs', discount: '15% off', icon: <School /> },
    ],
  },
  {
    id: 3,
    name: 'Shadab Imran',
    role: 'MERN Stack Developer at Hubx.ai | Programming, MongoDB, Django',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65e40fad1fece.webp?d=240x240',
    services: [
      { name: '1-1 Call', price: '₹700', time: '30 min', discount: '10% off', icon: <CalendarToday /> },
      { name: 'Quick Chat', price: '₹350', time: '15 min', discount: '8% off', icon: <Chat /> },
      { name: 'Resume Review', price: '₹550', time: '1 hr', discount: '12% off', icon: <Description /> },
      { name: 'Placement Prep', price: '₹800', time: '2 hrs', discount: '18% off', icon: <School /> },
    ],
  },
  {
    id: 4,
    name: 'Nusrat Gulbarga',
    role: 'Full Stack Developer | Data Analyst | Big Data & AWS Cloud Enthusiast',
    availability: 'Available',
    image: 'https://d8it4huxumps7.cloudfront.net/uploads/mentors/profile/65e2d4ade1037.webp?d=240x240',
    services: [
      { name: '1-1 Call', price: '₹850', time: '30 min', discount: '15% off', icon: <CalendarToday /> },
      { name: 'Quick Chat', price: '₹400', time: '15 min', discount: '10% off', icon: <Chat /> },
      { name: 'Resume Review', price: '₹700', time: '1 hr', discount: '20% off', icon: <Description /> },
      { name: 'Placement Prep', price: '₹900', time: '2 hrs', discount: '25% off', icon: <School /> },
    ],
  },
];

function MentorProfile() {
  const { id } = useParams();
  const mentor = mentors.find((mentor) => mentor.id === parseInt(id));

  if (!mentor) {
    return <Typography variant="h6">Mentor not found!</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side: Mentor Details */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              src={mentor.image}
              alt={mentor.name}
              sx={{ width: 150, height: 150, margin: '0 auto' }}
            />
            <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
              {mentor.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {mentor.role}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Availability: {mentor.availability}
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/dashboard/mentors"
            variant="contained"
            sx={{
              backgroundColor: '#007FFF',
              color: 'white',
              textTransform: 'none',
              width: '100%',
            }}
          >
            Back to Mentors List
          </Button>
        </Grid>

        {/* Right Side: Mentor Services */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Services
          </Typography>
          <Grid container spacing={2}>
            {mentor.services.map((service, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          backgroundColor: '#f5f5f5',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        {service.icon}
                      </Box>
                      <Typography variant="h6">{service.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Price: {service.price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Time: {service.time}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Discount: {service.discount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined" color="primary" fullWidth>
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MentorProfile;
