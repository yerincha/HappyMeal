import Link from 'next/link';
import React, { useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
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

function Search() {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [loadedItems, setLoadedItems] = useState(new Array<Item>());
  const [selected, setSelected] = useState();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadItems = () => {
    console.log(user);
    APIService.getInstance()
      .getFridgeItems(user.uid)
      .then((items: Array<Item>) => {
        return setLoadedItems(items);
      });
  };

  const setItems = () => {
    let i1 = new Item('onion', 1, null);
    let i2 = new Item('galic', 2, null);

    APIService.getInstance().setFridge(user.uid, [i1, i2]);
  };

  React.useEffect(() => {
    loadItems();
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
              Search Ingredient
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
                  label='Ingredients'
                  margin='normal'
                  name='ingredient'
                  placeholder='onion, bluberry, pork belly, etc...'
                  required
                  size='large'
                />
                <SearchIcon onClick={handleSearch} />
              </Box>
            )}
          />
          <Box sx={{ flexGrow: 1 }}>
            {searchResults.length > 0 &&
              searchResults.map(
                (item: { id: number; name: string; image: string }, i) => (
                  <SearchedItem key={i} item={item} />
                )
              )}
          </Box>
        </AppForm>
        <AppForm>
          <React.Fragment>
            <Typography
              variant='h4'
              gutterBottom
              marked='center'
              align='center'
            >
              My Fridge
            </Typography>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            {loadedItems.length > 0 &&
              loadedItems.map((item: Item, i) => (
                <LoadedItem key={i} item={item} />
              ))}
          </Box>
        </AppForm>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(Search);
