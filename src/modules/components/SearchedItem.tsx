import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Item from '../../model/Item';
import { useAuth } from '../../context/AuthContext';
import APIService from '../../api/APIService';
import 'react-datepicker/dist/react-datepicker.css';
import { Timestamp } from 'firebase/firestore';
import { Button, DatePicker, InputNumber, List, Typography } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

function SearchedItem(props: {
  item: { id: number; name: string; image: string };
  loadedItems: Map<number, Item>;
  loadItems: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const [expiredAt, setExpiredAt] = useState(Timestamp.fromDate(new Date()));
  const { user } = useAuth();

  const handleQuantityChange = (value: number | null) => {
    setQuantity(value ?? 0);
  };

  const handleAddList = () => {
    const { item, loadedItems, loadItems } = props;
    let newItem = new Item(item.id, item.name, quantity, expiredAt);
    loadedItems.set(item.id, newItem);
    APIService.getInstance()
      .setFridge(user.uid, Array.from(loadedItems.values()))
      .then((res) => {
        loadItems();
      });
  };

  const handleDateChange = (value: dayjs.Dayjs | null, dateString: string) => {
    if (value) {
      setExpiredAt(Timestamp.fromDate(value.toDate()));
    }
  };

  return (
    <List.Item data-testid='searchedItem'>
      <Stack
        width={'100%'}
        direction={'row'}
        spacing={2}
        justifyContent='space-between'
        alignItems='center'
      >
        <Stack width={'30%'}>
          <Text strong>{props.item.name}</Text>
        </Stack>
        <InputNumber
          min={1}
          max={100}
          defaultValue={1}
          onChange={handleQuantityChange}
        />
        <DatePicker
          defaultValue={dayjs()}
          format={'YYYY/MM/DD'}
          onChange={handleDateChange}
          data-testid='myItemDate'
        />
        <Button type='dashed' onClick={handleAddList}>
          Add to List
        </Button>
      </Stack>
    </List.Item>
  );
}
export default SearchedItem;
