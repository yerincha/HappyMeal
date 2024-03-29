import React from 'react';
import axios from 'axios';
import { API_KEY } from '../../credentials';
import APIService from '../../api/APIService';
import { useAuth } from '../../context/AuthContext';
import Recipe from '../../model/Recipe';
import { Button, Rate } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Stack } from '@mui/material';

import { Typography } from 'antd';

const { Text } = Typography;

const { Meta } = Card;

export default function CollectionCardGrid(props: {
  tile: Recipe;
  loadedRecipes: Map<number, Recipe>;
  loadItems: () => void;
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

  const handleTried = (event: React.MouseEvent) => {
    event.stopPropagation();

    const { loadedRecipes, tile, loadItems } = props;

    tile.isTried = !tile.isTried;

    APIService.getInstance().setMyRecipes(
      user.uid,
      Array.from(loadedRecipes.values())
    );

    loadItems();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { loadedRecipes, tile, loadItems } = props;
    loadedRecipes.delete(tile.id);
    APIService.getInstance().setMyRecipes(
      user.uid,
      Array.from(loadedRecipes.values())
    );
    loadItems();
  };

  const handleRate = (value: number) => {
    const { loadedRecipes, tile, loadItems } = props;

    tile.rating = value;

    APIService.getInstance().setMyRecipes(
      user.uid,
      Array.from(loadedRecipes.values())
    );

    loadItems();
  };

  return (
    <Card
      // eslint-disable-next-line @next/next/no-img-element
      cover={<img alt='example' src={props.tile.image} />}
      actions={[
        <CheckOutlined
          key='tried'
          style={props.tile.isTried ? { color: '#FF3D00' } : {}}
          onClick={handleTried}
          data-testid='triedButton'
        />,
        <DeleteOutlined
          key='delete'
          onClick={(event) => handleDelete(event)}
          data-testid='deleteButton'
        />,
      ]}
    >
      <Meta title={props.tile.title} data-testid='recipeTitle' />
      <Meta
        data-testid='recipeAddedDateTime'
        data-time={props.tile.addedDateTime?.toDate().getTime()}
        description={`${props.tile.addedDateTime
          ?.toDate()
          .toLocaleDateString()} ${props.tile.addedDateTime
          ?.toDate()
          .toLocaleTimeString()}`}
      />
      <Stack marginTop={3} spacing={2}>
        <Button
          type='dashed'
          onClick={handleDetailClick}
          data-testid='seeDetailButton'
        >
          See Detail
        </Button>
        {props.tile.isTried ? (
          <Stack>
            <Text type='secondary' data-testid='myRatingTitle'>
              🍽️ My Rating
            </Text>
            <Rate
              allowHalf
              value={props.tile.rating}
              onChange={(value) => handleRate(value)}
            />
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Card>
  );
}
