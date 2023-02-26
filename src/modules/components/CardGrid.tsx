import React from 'react';
import Input from '@mui/material';
import { makeStyles } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import GridList from '@mui/material/Grid';
import CardItem from './CardItem';
import RecipeModal from './Modal';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Recipe from '../../model/Recipe';

export default function CardGrid(props: { data: Array<Recipe> }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='CardGrid'>
      <GridList width='100%' height='auto' cellHeight={'auto'} spacing={0}>
        {props.data.map((tile, i) => (
          <CardItem tile={tile} key={i} />
        ))}
      </GridList>
    </div>
  );
}
