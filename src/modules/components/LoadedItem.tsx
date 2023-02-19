import TextField from './TextField';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import Typography from './Typography';
import Item from '../../model/Item';

function LoadedItem(props: { key: number; item: Item }) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  useEffect(() => {
    // setQuantity(item.quantity)
  }, []);
  const date = () => {
    const expiredDate = props.item.expiredAt?.toDate();
    return expiredDate;
  };

  const handleQuantityChange = (e: any) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };
  return (
    <Grid item container spacing={2} key={props.key}>
      <Grid item xs={6}>
        <Typography align='left'>{props.item.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <TextField
          size='small'
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          onChange={handleQuantityChange}
        >
          {quantity}
        </TextField>
      </Grid>
      <Grid>
        {props.item.expiredAt === null
          ? 'N/A'
          : `${props.item.expiredAt.toDate()}`}
      </Grid>
      <Grid>
        <Button>Remove</Button>
      </Grid>
    </Grid>
  );
}
export default LoadedItem;
