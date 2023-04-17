/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import AppAppBar from '../../src/modules/views/AppAppBar';
import AppFooter from '../../src/modules/views/AppFooter';
import AppForm from '../../src/modules/views/AppForm';
import Box from '@mui/material/Box';
import Typography from '../../src/modules/components/Typography';
import withRoot from '../../src/modules/withRoot';
import APIService from '../../src/api/APIService';
import { useAuth } from '../../src/context/AuthContext';
import Recipe from '../../src/model/Recipe';
import CollectionCardGrid from '../../src/modules/components/CollectionCardGrid';
import { Cascader } from 'antd';

interface Option {
  value: string;
  label: string;
}

function RecipeCollection() {
  const { user } = useAuth();
  const [loadedRecipes, setLoadedRecipes] = useState(new Map<number, Recipe>());
  const [filteredLoadedRecipes, setFilteredLoadedRecipes] = useState(new Map<number, Recipe>());
  const [sortOption, setSortOption] = useState("");

  const loadItems = () => {
    APIService.getInstance()
      .getMyRecipes(user.uid)
      .then((recipes: Array<Recipe>) => {
        let map = new Map<number, Recipe>();
        recipes.forEach((item) => {
          map.set(item.id, item);
        });
        setLoadedRecipes(map);
        setFilteredLoadedRecipes(map);
      });
  };

  React.useEffect(() => {
    loadItems();
  }, []);

  const filterOptions: Option[] = [
    {
      value: 'no',
      label: 'No Filter',
    },
    {
      value: 'not_tried',
      label: 'Not Tried',
    },
    {
      value: 'tried',
      label: 'Tried',
    },
    {
      value: 'good_rating',
      label: 'Good Rating (Over 4)',
    },
  ];

  const sortOptions: Option[] = [
    {
      value: 'no',
      label: 'No Filter',
    },
    {
      value: 'name_asc',
      label: 'Name A-Z',
    },
    {
      value: 'name_dsc',
      label: 'Name Z-A',
    },
    {
      value: 'added_datetime_asc',
      label: 'Added Date ASC',
    },
    {
      value: 'added_datetime_dsc',
      label: 'Added Date DSC',
    },
  ];

  const handleFilterChange = (value: string[]) => {
    if (value) {
      let map = new Map<number, Recipe>()
      switch (value[0]) {
        case 'no':
          setFilteredLoadedRecipes(loadedRecipes);
          break;
        case 'not_tried':
          map = new Map<number, Recipe>();
          loadedRecipes.forEach((item) => {
            if (!item.isTried) {
              map.set(item.id, item);
            }
          });
          setFilteredLoadedRecipes(map);
          break;
        case 'tried':
          map = new Map<number, Recipe>();
          loadedRecipes.forEach((item) => {
            if (item.isTried) {
              map.set(item.id, item);
            }
          });
          setFilteredLoadedRecipes(map);
          break;
        case 'good_rating':
          map = new Map<number, Recipe>();
          loadedRecipes.forEach((item) => {
            if (item.isTried && item.rating && item.rating >= 4) {
              map.set(item.id, item);
            }
          });
          setFilteredLoadedRecipes(map);
          break;
      }
    } else {
      setFilteredLoadedRecipes(loadedRecipes);
    }
  };

  const handleSortChange = (value: string[]) => {
    if (value) {
      setSortOption(value[0]);
    } else {
      setSortOption("");
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
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
            <div className='align-right' style={{margin: '10px'}}>
              <Cascader data-testid='filterCascader' options={filterOptions} onChange={handleFilterChange} placeholder="Please select filter"/>
              <Cascader data-testid='sortCascader' style={{marginLeft: '10px'}} options={sortOptions} onChange={handleSortChange} placeholder="Sort options"/>
            </div>
          </React.Fragment>
          <Box sx={{ flexGrow: 1 }}>
            <CollectionCardGrid loadedRecipes={filteredLoadedRecipes} loadItems={loadItems} sortOption={sortOption}/>
          </Box>
        </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}
export default withRoot(RecipeCollection);