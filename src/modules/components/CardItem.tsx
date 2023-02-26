import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import Typography from './Typography';
import axios from 'axios';
import { API_KEY } from '../../credentials';

export default function CardGrid(props: {
  tile: { id: number; image: string; title: string };
}) {
  const [url, setUrl] = useState('');
  const getDetails = () => {
    const options = {
      method: 'GET',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.tile.id}/information`,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };

    return axios
      .request(options)
      .then((response) => {
        setUrl(response.data.sourceUrl);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDetailClick = () => {
    getDetails().then(() => {
      window.open(url);
    });
  };

  const handleAddClick = () => {};
  return (
    <Card maxWidth={160} cellheight={'100%'}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='160'
          image={props.tile.image}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='body2' component='h2' noWrap>
            {props.tile.title}
          </Typography>
          <Button> Add to My List</Button>
          <Button onClick={handleDetailClick}>See details</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
