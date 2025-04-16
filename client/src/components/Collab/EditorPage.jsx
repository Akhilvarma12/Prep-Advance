import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

function EditorPage() {
  return (
    <Box sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={2}>
          <Paper
            sx={{
              height: '100%',
              backgroundColor: 'primary.dark',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              p: 2,
            }}
            square
          >
            <Typography variant="h6">Member</Typography>
            <button>copy room id</button>
            <button>Leave room</button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={10}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5">Editor</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditorPage;
