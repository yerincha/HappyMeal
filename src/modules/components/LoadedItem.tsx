import { Grid, Input } from '@mui/material';
import React, { useState } from 'react';
import Button from './Button';
import Typography from './Typography';
import Item from '../../model/Item';
import APIService from '../../api/APIService';
import { useAuth } from '../../context/AuthContext';

function LoadedItem(props: {
  key: number;
  item: Item;
  loadedItems: Map<number, Item>;
  loadItems: () => void;
}) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(props.item.quantity);
  const date = () => {
    const expiredDate = props.item.expiredAt?.toDate();
    return expiredDate;
  };

  const handleQuantityChange = (e: any) => {
    e.preventDefault();
    if (isNaN(e.target.valueAsNumber)) {
      setQuantity(0);
    } else {
      setQuantity(e.target.valueAsNumber);
    }
  };

  const handleSave = () => {
    const { item, loadedItems } = props;
    item.quantity = quantity;
    loadedItems.set(item.id, item);
    APIService.getInstance().setFridge(
      user.uid,
      Array.from(loadedItems.values())
    );
  };

  const handleDelete = () => {
    const { item, loadedItems, loadItems } = props;
    loadedItems.delete(item.id);
    APIService.getInstance().setFridge(
      user.uid,
      Array.from(loadedItems.values())
    );
    loadItems();
  };

  return (
    <Grid item container sx={{ p: 0 }} spacing={2} data-testid='myItem'>
      <Grid item xs={3} sx={{ p: 0 }}>
        <Typography align='left'>{props.item.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Input
          data-testid='quantityInput'
          size='small'
          type='number'
          onChange={handleQuantityChange}
          value={quantity}
        />
      </Grid>
      <Grid item xs={2}>
        {props.item.expiredAt === null
          ? 'N/A'
          : `${props.item.expiredAt.toDate().toDateString()}`}
      </Grid>
      <Grid item xs={2}>
        <Button onClick={handleSave} data-testid='saveButton'>Save</Button>
      </Grid>
      <Grid item xs={1}>
        <Button onClick={handleDelete} data-testid='removeButton'>Remove</Button>
      </Grid>
    </Grid>
  );
}
export default LoadedItem;
