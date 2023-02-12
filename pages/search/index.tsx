import Link from 'next/link';
import React, { useState } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppFooter from '../../src/modules/views/AppFooter';
import AppForm from '../../src/modules/views/AppForm';
import Box from '@mui/material/Box';
import Typography from '../../src/modules/components/Typography';
import withRoot from '../../src/modules/withRoot';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RFTextField from '../../src/modules/form/RFTextField';
import FormButton from '../../src/modules/form/FormButton';
import { API_KEY } from '../../src/credentials';
import axios from 'axios';

function Search() {
  const [data, setData] = useState([]);

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
        setData(result);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant='h4' gutterBottom marked='center' align='center'>
            My Fridge
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
        {data.length > 0  &&
          data.map((item: {name: string} , i) => (
            <Button key={i} variant='outlined'>
              {item.name}
            </Button>
          ))}
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(Search);
