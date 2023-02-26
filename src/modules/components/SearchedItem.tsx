import { Grid, Input } from '@mui/material';
import React, { useState } from 'react';
import Button from './Button';
import Typography from './Typography';
import Item from '../../model/Item';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../api/APIService';

function SearchedItem(props: {
  item: { id: number; name: string; image: string };
  loadedItems: Array<Item>;
  loadItems: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [expiredAt, setExpiredAt] = useState(null);
  const { user } = useAuth();
  const handleQuantityChange = (e: any) => {
    e.preventDefault();
    setQuantity(e.target.valueAsNumber);
  };

  const handleAddList = () => {
    const { item, loadedItems, loadItems } = props;
    let newItem = new Item(item.id, item.name, quantity, expiredAt);
    let newArr = [];
    let flag = false;
    for (let i = 0; i < loadedItems.length; i++) {
      if (loadedItems[i].id === newItem.id) {
        loadedItems[i].quantity += quantity;
        flag = true;
      }
      newArr.push(loadedItems[i]);
    }
    if (!flag) {
      newArr.push(newItem);
    }
    APIService.getInstance().setFridge(user.uid, newArr);
    loadItems();
  };

  return (
    <Grid item container spacing={2}>
      <Grid item xs={6}>
        <Typography align='left'>{props.item.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Input
          size='small'
          type='number'
          onChange={handleQuantityChange}
          value={quantity}
        />
      </Grid>
      <Grid>
        <Button onClick={handleAddList}>Add to list</Button>
      </Grid>
    </Grid>
  );
}
export default SearchedItem;
