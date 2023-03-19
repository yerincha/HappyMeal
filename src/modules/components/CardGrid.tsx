import React from 'react';
import GridList from '@mui/material/Grid';
import CardItem from './CardItem';
import Recipe from '../../model/Recipe';

export default function CardGrid(props: {
  data: Array<Recipe>;
  loadedRecipes: Map<number, Recipe>;
}) {
  return (
    <div className='CardGrid'>
      <GridList container item xs={12} spacing={0}>
        {props.loadedRecipes.size > 0 &&
          Array.from(props.loadedRecipes.values()).map((tile: Recipe, i) => (
            <CardItem tile={tile} key={i} loadedRecipes={props.loadedRecipes} />
          ))}
      </GridList>
    </div>
  );
}
