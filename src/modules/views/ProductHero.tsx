/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  "https://img.freepik.com/free-photo/epilepsy-awareness-symbol-pink-backdrop_23-2147863550.jpg?t=st=1673123006~exp=1673123606~hmac=7ac9ce50295084c118a39a06165624d0a42e34b9e19767a2ba3d7303341d7311";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Welcome to HAPPYMEAL
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Symptom log and Discover Prossible Diseases Program
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/signup"
        sx={{ minWidth: 200 }}
      >
        Sign up
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Help health management
      </Typography>
    </ProductHeroLayout>
  );
}
