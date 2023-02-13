import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { useAuth } from '../../context/AuthContext';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const { user, signout }  = useAuth();
  const handleLogout = async () => {
    try {
      await signout();
      Router.replace('/')
      console.log('sign out complete');
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant='h6'
            underline='none'
            color='inherit'
            href='/'
            sx={{ fontSize: 24 }}
          >
            {'HappyMeal'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color='inherit'
              variant='h6'
              underline='none'
              href='/search'
              sx={rightLink}
            >
              {'my fridge'}
            </Link>
            <Link
              variant='h6'
              underline='none'
              href='/recipes'
              sx={rightLink}
            >
              {'Recipes'}
            </Link>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {user ? (
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                href='/'
                sx={rightLink}
                onClick={handleLogout}
              >
                {'Sign out'}
              </Link>
            ) : (
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                href='/signin'
                sx={rightLink}
              >
                {'Sign in'}
              </Link>
            )}
            {user !== null ? (
              <Link
                variant='h6'
                underline='none'
                href='/'
                sx={{ ...rightLink, color: 'secondary.main' }}
              >
              </Link>
            ) : (
              <Link
                variant='h6'
                underline='none'
                href='/signup'
                sx={{ ...rightLink, color: 'secondary.main' }}
              >
                {'Sign up'}
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
