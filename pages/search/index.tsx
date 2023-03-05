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

function Search() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [loadedItems, setLoadedItems] = useState(new Map<number, Item>());

  const handleSearch = (values: { ingredient: string }) => {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search',
      params: {
        query: values.ingredient,
        number: '10',
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
        const result = response.data.results;
        setSearchResults(result);
        console.log(result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const loadItems = () => {
    APIService.getInstance()
      .getFridgeItems(user.uid)
      .then((items: Array<Item>) => {
        let map = new Map<number, Item>();
        items.forEach((item) => {
          map.set(item.id, item);
        });
        setLoadedItems(map);
      });
  };

  React.useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <AppAppBar />
      <Grid container justifyContent='center' alignItems='center'>
        <AppForm>
          <Typography variant='h4' gutterBottom marked='center' align='center'>
            Search Ingredient
          </Typography>
          <Form
            onSubmit={handleSearch}
            render={({ handleSubmit: handleSearch }) => (
              <Box
                component='form'
                noValidate
                onSubmit={handleSearch}
                sx={{ mt: 1 }}
              >
                <Grid container>
                  <Grid item xs={10}>
                    <Field
                      autoFocus
                      component={RFTextField}
                      fullWidth
                      label='Ingredients'
                      margin='normal'
                      name='ingredient'
                      placeholder='onion, blueberry, pork belly, etc...'
                      required
                      size='small'
                    />
                  </Grid>
                  <Grid item sx={{m:5}}>
                    <SearchIcon onClick={handleSearch} />
                  </Grid>
                </Grid>
              </Box>
            )}
          />
          <Box sx={{ flexGrow: 1 }}>
            {searchResults.length > 0 &&
              searchResults.map(
                (item: { id: number; name: string; image: string }, i) => (
                  <SearchedItem
                    key={i}
                    item={item}
                    loadedItems={loadedItems}
                    loadItems={loadItems}
                  />
                )
              )}
          </Box>
          <Typography variant='h4' gutterBottom marked='center' align='center'>
            My Fridge
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            {loadedItems.size > 0 &&
              Array.from(loadedItems.values()).map((item: Item, i) => (
                <LoadedItem
                  key={i}
                  item={item}
                  loadedItems={loadedItems}
                  loadItems={loadItems}
                />
              ))}
          </Box>
        </AppForm>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(Search);
