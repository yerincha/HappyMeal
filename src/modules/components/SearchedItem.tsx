import TextField from './TextField';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import Typography from './Typography';

function SearchedItem(props: {
  key: number;
  item: { id: number; name: string; image: string };
}) {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    console.log(props.item);
  }, []);
  return (
    <Grid item container spacing={2} key={props.key}>
      <Grid item xs={6}>
        <Typography  align='left'>
          {props.item.name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          size='small'
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </Grid>
      <Grid>
        <Button>Add to list</Button>
      </Grid>
    </Grid>
  );
}
export default SearchedItem;
