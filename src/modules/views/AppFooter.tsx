import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color='inherit' href='/'>
        HappyMeal
      </Link>{' '}
      {new Date().getFullYear()}
      {' All Rights Reserved'}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

export default function AppFooter() {
  return (
    <Typography
      component='footer'
      sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant='h6' marked='left' gutterBottom>
              Legal
            </Typography>
            <Box component='ul' sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component='li' sx={{ py: 0.5 }}>
                <Link href='/'>Terms and Uses</Link>
              </Box>
              <Box component='li' sx={{ py: 0.5 }}>
                <Link href='/'>Unsubscribe Email</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant='h6' marked='left' gutterBottom>
              Contacts
            </Typography>
            <Box component='ul' sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component='li' sx={{ py: 0.5 }}>
                Yerin Cha: yjc5395@psu.edu
              </Box>
            </Box>
          </Grid>
          <Grid item >
            <Typography variant='caption'>
              <Copyright />
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
