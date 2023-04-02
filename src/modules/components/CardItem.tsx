import React from 'react';
import axios from 'axios';
import { API_KEY } from '../../credentials';
import APIService from '../../api/APIService';
import { useAuth } from '../../context/AuthContext';
import Recipe from '../../model/Recipe';
import { Button, Card } from 'antd';
import { Stack } from '@mui/material';

const { Meta } = Card;

export default function CardGrid(props: {
  tile: Recipe;
  loadedRecipes: Map<number, Recipe>;
}) {
  const { user } = useAuth();

  const [isSaving, setIsSaving] = React.useState<boolean>(false);

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

  const handleAddToMyListClick = () => {
    setIsSaving(true);
    const { loadedRecipes, tile } = props;
    if (loadedRecipes.has(tile.id)) {
      return;
    }
    loadedRecipes.set(tile.id, tile);
    APIService.getInstance()
      .setMyRecipes(user.uid, Array.from(loadedRecipes.values()))
      .then((res) => {
        setIsSaving(false);
      });
  };

  return (
    <Card cover={<img alt='example' src={props.tile.image} />}>
      <Meta title={props.tile.title} data-testid='recipeTitle' />
      <Stack marginTop={3} spacing={2}>
        <Button
          type='dashed'
          onClick={handleDetailClick}
          data-testid='seeDetailButton'
        >
          See Detail
        </Button>
        <Button
          type='dashed'
          loading={isSaving}
          onClick={handleAddToMyListClick}
          data-testid='addRecipeButton'
        >
          {props.loadedRecipes.has(props.tile.id)
            ? '✅ Already In My Recipe'
            : 'Add to My Recipe'}
        </Button>
      </Stack>
    </Card>
  );
}
