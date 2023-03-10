/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppFooter from '../../src/modules/views/AppFooter';
import AppForm from '../../src/modules/views/AppForm';
import Box from '@mui/material/Box';
import Typography from '../../src/modules/components/Typography';
import withRoot from '../../src/modules/withRoot';
import { Grid } from '@mui/material';
import APIService from '../../src/api/APIService';
import { useAuth } from '../../src/context/AuthContext';
import Recipe from '../../src/model/Recipe';
import CardGrid from '../../src/modules/components/CardGrid';

function RecipeCollection() {
  const { user } = useAuth();
  const [loadedRecipes, setLoadedRecipes] = useState(new Array<Recipe>());

  const loadItems = () => {
    APIService.getInstance()
      .getMyRecipes(user.uid)
      .then((recipes: Array<Recipe>) => {
        setLoadedRecipes(recipes);
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
              My Recipes
            </Typography>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <CardGrid data={loadedRecipes} loadedRecipes={loadedRecipes} />
          </Box>
        </AppForm>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(RecipeCollection);
