/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppFooter from '../../src/modules/views/AppFooter';
import AppForm from '../../src/modules/views/AppForm';
import Box from '@mui/material/Box';
import Typography from '../../src/modules/components/Typography';
import withRoot from '../../src/modules/withRoot';
import { Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RFTextField from '../../src/modules/form/RFTextField';
import { API_KEY } from '../../src/credentials';
import axios from 'axios';
import APIService from '../../src/api/APIService';
import { useAuth } from '../../src/context/AuthContext';
import Item from '../../src/model/Item';
import CardGrid from '../../src/modules/components/CardGrid';
import Recipe from '../../src/model/Recipe';

function SearchRecipe() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState(new Array<Recipe>());
  const [myFridgeItems, setMyFridgeItems] = useState('');
  const [loadedRecipes, setLoadedRecipes] = useState(new Array<Recipe>());

  const handleSearch = (values: { query: string }) => {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: values.query,
        number: '6',
        ignorePantry: 'true',
        ranking: '1',
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        let data = [];
        for (let i = 0; i < response.data.length; i++) {
          let item = response.data[i];
          let recipe = new Recipe(item.id, item.title, item.image, false);
          data.push(recipe);
        }
        setSearchResults(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleDefaultSearch = () => {
    if (myFridgeItems.length === 0) {
      let itemNames = '';

      APIService.getInstance()
        .getFridgeItems(user.uid)
        .then((items: Array<Item>) => {
          for (let i = 0; i < items.length; i++) {
            if (i !== items.length - 1) {
              itemNames += items[i].name + ', ';
            } else {
              itemNames += items[i].name;
            }
          }
          setMyFridgeItems(itemNames);
          handleSearch({ query: itemNames });
        })
    }
    handleSearch({ query: myFridgeItems });
  };

  const fetchMyRecipes = () => {
    APIService.getInstance()
      .getMyRecipes(user.uid)
      .then((recipes: Array<Recipe>) => {
        setLoadedRecipes(recipes);
      });
  };

  React.useEffect(() => {
    let itemNames = '';
    APIService.getInstance()
    .getFridgeItems(user.uid)
    .then((items: Array<Item>) => {
      for (let i = 0; i < items.length; i++) {
        if (i !== items.length - 1) {
          itemNames += items[i].name + ', ';
        } else {
          itemNames += items[i].name;
        }
      }
      setMyFridgeItems(itemNames);
      fetchMyRecipes();
    });
  }, []);

  return (
    <React.Fragment>
      <AppAppBar />
      <Grid container justifyContent='center' alignItems='center'>
        <AppForm>
          <React.Fragment>
            <Typography
              variant='h4'
              gutterBottom
              marked='center'
              align='center'
            >
              Search Recipes
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={handleSearch}
            render={({ handleSubmit: handleSearch }) => (
              <Box
                component='form'
                noValidate
                onSubmit={handleSearch}
                sx={{ mt: 2 }}
              >
                <Grid container>
                  <Grid item xs={11}>
                    <Field
                      autoFocus
                      component={RFTextField}
                      fullWidth
                      label='Search recipes with ingredients'
                      margin='normal'
                      name='query'
                      placeholder={
                        myFridgeItems.length > 0
                          ? myFridgeItems
                          : 'onion, ground beef, carrot, etc'
                      }
                      required
                      size='large'
                    />
                  </Grid>
                  <Grid item sx={{ p: 2, mt: 4 }}>
                    <SearchIcon onClick={handleSearch} />
                  </Grid>
                </Grid>
                <Box sx={{ ml: 90, mb: 5 }}>
                  <Button onClick={handleDefaultSearch} data-testid='searchRecipeWithMyFridge'>
                    Search with my fridge items
                  </Button>
                </Box>
              </Box>
            )}
          />
          <Box sx={{ flexGrow: 1 }}>
            <CardGrid data={searchResults} loadedRecipes={loadedRecipes} />
          </Box>
        </AppForm>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(SearchRecipe);
