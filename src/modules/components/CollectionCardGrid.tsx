import React from 'react';
import { List } from 'antd';
import CollectionCardItem from './CollectionCardItem';
import Recipe from '../../model/Recipe';

export default function CollectionCardGrid(props: {
  loadItems: () => void;
  loadedRecipes: Map<number, Recipe>;
  sortOption: string;
}) {
  return (
    <List
      width={'70%'}
      grid={{ gutter: 10, column: 3 }}
      dataSource={Array.from(props.loadedRecipes.values()).sort((i1, i2) => {
        switch (props.sortOption) {
          case 'no':
          case '':
            return -1;
          case 'name_asc':
            return i1.title.localeCompare(i2.title);
          case 'name_dsc':
            return -i1.title.localeCompare(i2.title);
          case 'added_datetime_asc':
            return (
              (i1.addedDateTime?.seconds ?? 0) -
              (i2.addedDateTime?.seconds ?? 0)
            );
          case 'added_datetime_dsc':
            return (
              (i2.addedDateTime?.seconds ?? 0) -
              (i1.addedDateTime?.seconds ?? 0)
            );
        }
        return -1;
      })}
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
