import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppFooter from '../../src/modules/views/AppFooter';
import AppForm from '../../src/modules/views/AppForm';
import Box from '@mui/material/Box';
import Typography from '../../src/modules/components/Typography';
import withRoot from '../../src/modules/withRoot';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RFTextField from '../../src/modules/form/RFTextField';
import { API_KEY } from '../../src/credentials';
import axios from 'axios';
import APIService from '../../src/api/APIService';
import { useAuth } from '../../src/context/AuthContext';
import Item from '../../src/model/Item';
import SearchedItem from '../../src/modules/components/SearchedItem';
import LoadedItem from '../../src/modules/components/LoadedItem';
import { Timestamp } from 'firebase/firestore';
import CardGrid from '../../src/modules/components/CardGrid';
import Recipe from '../../src/model/Recipe';

function SearchRecipe() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState(new Array<Recipe>());
  const [loadedItems, setLoadedItems] = useState(new Array<Item>());
  const [selected, setSelected] = useState();

  const handleSearch = (values: { query: string }) => {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: values.query,
        number: '5',
        ignorePantry: 'true',
        ranking: '1',
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    console.log(values.query)
    axios
      .request(options)
      .then(function (response) {
        console.log(response)
        let data = [];
        for(let i = 0; i < response.data.length; i++) {
          let item = response.data[i];
          let recipe = new Recipe(item.id, item.title, item.image, false);
          data.push(recipe);
        }
        console.log(data)
        setSearchResults(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };


  React.useEffect(() => {
    // setItems();
    console.log(searchResults);
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
                <Field
                  autoFocus
                  component={RFTextField}
                  fullWidth
                  label='Search recipes with ingredients'
                  margin='normal'
                  name='query'
                  placeholder='onion, bluberry, pork belly, etc...'
                  required
                  size='large'
                />
                <SearchIcon onClick={handleSearch} />
              </Box>
            )}
          />
          <Box sx={{ flexGrow: 1 }}>
              <CardGrid data={searchResults}/>
          </Box>
        </AppForm>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(SearchRecipe);
