import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CategoryItem from './CategoryItem';
import { Category } from '../../../@types/category';

const styles = StyleSheet.create({
  flatList: {
    paddingLeft: 15,
    margin: 0,
  },
});

type CategoryListProps = {
  categories: Category[];
};

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={category => String(category.id)}
      renderItem={({ item: category }) => <CategoryItem category={category} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatList}
    />
  );
};

export default CategoryList;
