import React from 'react';
import GridList from '@mui/material/Grid';
import CollectionCardItem from './CollectionCardItem';
import Recipe from '../../model/Recipe';

export default function CollectionCardGrid(props: {
  loadItems: () => void;
  loadedRecipes: Map<number, Recipe>;
}) {
  return (
    <div className='CardGrid'>
      <GridList container item xs={12} spacing={0}>
        {props.loadedRecipes.size > 0 &&
          Array.from(props.loadedRecipes.values()).map((tile: Recipe, i) => (
            <CollectionCardItem loadItems={props.loadItems} tile={tile} key={i} loadedRecipes={props.loadedRecipes} />
          ))}
      </GridList>
    </div>
  );
}
