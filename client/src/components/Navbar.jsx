import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar  position="static" color="default">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to={'/'}
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          Prep Advance
        </Typography>

        {/* Authentication Buttons */}
        <Box>
          <SignedOut>
            <SignInButton>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#61dafb', color: '#000', fontWeight: 'bold' }}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
