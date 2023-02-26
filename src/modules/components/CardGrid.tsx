import React from 'react';
import Input from '@mui/material';
import { makeStyles } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import GridList from '@mui/material/Grid';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Recipe from '../../model/Recipe';

export default function CardGrid(props: { data: Array<Recipe> }) {
  return (
    <div className='CardGrid'>
      <GridList width='100%' height='auto' cellHeight={'auto'} spacing={0}>
        {props.data.map((tile, i) => (
          <Card key={i} maxWidth={160} height='100%'>
            <CardActionArea>
              <CardMedia
                component='img'
                alt='Contemplative Reptile'
                height='160'
                image={tile.image}
                title='Contemplative Reptile'
              />
              <CardContent>
                <Typography gutterBottom variant='body2' component='h2' noWrap>
                  {tile.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </GridList>
    </div>
  );
}
