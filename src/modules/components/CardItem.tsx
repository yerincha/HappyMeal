import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Typography from './Typography';
import axios from 'axios';
import { API_KEY } from '../../credentials';
import APIService from '../../api/APIService';
import { useAuth } from '../../context/AuthContext';
import Recipe from '../../model/Recipe';

export default function CardGrid(props: {
  tile: Recipe;
  loadedRecipes: Map<number, Recipe>;
}) {
  const { user } = useAuth();

  const handleDetailClick = () => {
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
        window.open(response.data.sourceUrl);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleAddClick = (event: Event) => {
    event.stopPropagation();
    const { loadedRecipes, tile } = props;
    if (loadedRecipes.has(tile.id)) {
      return;
    }
    loadedRecipes.set(tile.id, tile);
    APIService.getInstance().setMyRecipes(
      user.uid,
      Array.from(loadedRecipes.values())
    );
    alert('Saved!');
  };

  const handleDelete = () => {
    const { loadedRecipes, tile } = props;
    loadedRecipes.delete(tile.id);
    APIService.getInstance().setMyRecipes(
      user.uid,
      Array.from(loadedRecipes.values())
    );
  };

  return (
    <Card sx={{ width: 500 }} data-testid='recipeItemCard'>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          sx={{ height: 200 }}
          image={props.tile.image}
          title='Contemplative Reptile'
          onClick={handleDetailClick}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='body2'
            component='h2'
            noWrap
            data-testid='recipeTitle'
            onClick={handleDetailClick}
          >
            {props.tile.title}
          </Typography>
          <Typography onClick={handleAddClick} data-testid='addRecipeButton'>
            {' '}
            Add to My List
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
