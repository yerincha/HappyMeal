import React from 'react';
import { List } from 'antd';
import CollectionCardItem from './CollectionCardItem';
import Recipe from '../../model/Recipe';

export default function CollectionCardGrid(props: {
  loadItems: () => void;
  loadedRecipes: Map<number, Recipe>;
}) {
  return (
    <List
      width={'70%'}
      grid={{ gutter: 10, column: 3 }}
      dataSource={props.loadedRecipes.values()}
      renderItem={(item) => (
        <List.Item>
          <CollectionCardItem
            loadItems={props.loadItems}
            tile={item}
            loadedRecipes={props.loadedRecipes}
          />
        </List.Item>
      )}
    />
  );
}
