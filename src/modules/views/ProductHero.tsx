/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  "https://img.freepik.com/free-photo/top-view-tasty-batch-food-cooked-arrangement_23-2148765563.jpg?t=st=1678045518~exp=1678046118~hmac=446f50bcf6101ee8ee707606a0a32c24cdfaa113679277fafa04a35e7eb5187a";

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
        Find your meal prep solution with your ingredients!
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
        Easy and Yummy Recipes
      </Typography>
    </ProductHeroLayout>
  );
}
