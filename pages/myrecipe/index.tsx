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
import Recipe from '../../src/model/Recipe';
import SearchedItem from '../../src/modules/components/SearchedItem';
import LoadedItem from '../../src/modules/components/LoadedItem';
import { Timestamp } from 'firebase/firestore';
import CardGrid from '../../src/modules/components/CardGrid';

function RecipeCollection() {
  const { user } = useAuth();
  const [loadedItems, setLoadedItems] = useState(new Array<Recipe>());
  const [selected, setSelected] = useState();

  const loadItems = () => {
    APIService.getInstance()
      .getMyRecipes(user.uid)
      .then((items: Array<Recipe>) => {
        setLoadedItems(items);
        console.log(items)
      });
  };

  React.useEffect(() => {
    loadItems();
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
              My Fridge
            </Typography>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            {loadedItems.length > 0 &&
              loadedItems.map((item: Recipe, i) => (
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
export default withRoot(RecipeCollection);
