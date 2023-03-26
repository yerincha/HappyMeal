import { Stack } from '@mui/material';
import React, { useState } from 'react';
import Item from '../../model/Item';
import APIService from '../../api/APIService';
import { useAuth } from '../../context/AuthContext';
import { InputNumber, DatePicker, Typography, List, Button } from 'antd';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

const { Text } = Typography;

function LoadedItem(props: {
  key: number;
  item: Item;
  loadedItems: Map<number, Item>;
  loadItems: () => void;
}) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [expiredAt, setExpiredAt] = useState(props.item.expiredAt);

  const handleQuantityChange = (value: number | null) => {
    setQuantity(value ?? 0);
  };

  const handleSave = () => {
    const { item, loadedItems } = props;
    item.quantity = quantity;
    item.expiredAt = expiredAt;
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

  const handleDateChange = (value: dayjs.Dayjs | null, dateString: string) => {
    if (value) {
      setExpiredAt(Timestamp.fromDate(value.toDate()));
    }
  }

  return (
    <List.Item>
      <Stack width={'100%'} direction={'row'} spacing={2} justifyContent="space-between" alignItems="center">
        <Stack width={'30%'}>
          <Text strong>{props.item.name}</Text>
        </Stack>
        <InputNumber min={1} max={100} defaultValue={props.item.quantity} onChange={handleQuantityChange}/>
        <DatePicker defaultValue={dayjs(props.item.expiredAt?.toDate())} format={'YYYY/MM/DD'}  onChange={handleDateChange}/>
        <Button type="dashed" onClick={handleSave}>Update</Button>
        <Button type="dashed" onClick={handleDelete}>Remove</Button>
      </Stack>
    </List.Item>
  );
}
export default LoadedItem;
