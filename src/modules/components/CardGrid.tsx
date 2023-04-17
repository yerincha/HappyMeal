import React from 'react';
import { List } from 'antd';
import CardItem from './CardItem';
import Recipe from '../../model/Recipe';

export default function CardGrid(props: {
  data: Array<Recipe>;
  loadedRecipes: Map<number, Recipe>;
}) {
  return (
    <List
      grid={{ gutter: 10, column: 3 }}
      dataSource={props.data ?? []}
      pagination={{ position: 'bottom', align: 'center', defaultPageSize: 6 }}
      renderItem={(item) => (
        <List.Item>
          <CardItem tile={item} loadedRecipes={props.loadedRecipes} />
        </List.Item>
      )}
    />
  );
}
