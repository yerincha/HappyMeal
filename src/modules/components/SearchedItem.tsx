import { Grid, Input } from '@mui/material';
import React, { useState } from 'react';
import Button from './Button';
import Typography from './Typography';
import Item from '../../model/Item';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../api/APIService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Timestamp} from 'firebase/firestore';

function SearchedItem(props: {
  item: { id: number; name: string; image: string };
  loadedItems: Map<number, Item>;
  loadItems: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [expiredAt, setExpiredAt] = useState(Timestamp.fromDate(new Date()));
  const { user } = useAuth();
  const handleQuantityChange = (e: any) => {
    e.preventDefault();
    setQuantity(e.target.valueAsNumber);
  };

  const handleAddList = () => {
    const { item, loadedItems, loadItems } = props;
    let newItem = new Item(item.id, item.name, quantity, expiredAt);
    console.log(item.name, loadedItems)
    loadedItems.set(item.id, newItem)
    APIService.getInstance().setFridge(user.uid, Array.from(loadedItems.values()));
    loadItems();
  };

  return (
    <Grid item container spacing={{xs:2, md:10}}>
      <Grid item xs={4} md={3}>
        <Typography align='left'>{props.item.name}</Typography>
      </Grid>
      <Grid item xs={2} >
        <Input
          size='small'
          type='number'
          onChange={handleQuantityChange}
          value={quantity}
        />
      </Grid>
      <Grid item xs={2} md={3}>
        <DatePicker
          selected={expiredAt.toDate()}
          onChange={(date: Date) => setExpiredAt(Timestamp.fromDate(date))}
        />
      </Grid>
      <Grid item xs={4} md={4} onClick={handleAddList}>
        Add to list {props.item.name}
      </Grid>
    </Grid>
  );
}
export default SearchedItem;
