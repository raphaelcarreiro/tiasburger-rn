import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Category } from '../../../@types/category';
import Text from '../../../components/bases/typography/Text';
import { useNavigation } from '@react-navigation/native';
import ListItem from '../../../components/list-item/ListItem';

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  dataText: {
    maxWidth: 200,
  },
});

interface CategoryListProps {
  category: Category;
}

const CategoryList: React.FC<CategoryListProps> = ({ category }) => {
  const navigator = useNavigation();

  function handlePress(categoryName: string): void {
    navigator.navigate('Products', { categoryName });
  }

  return (
    <ListItem style={styles.listItem} onPress={() => handlePress(category.name)}>
      <View style={styles.dataText}>
        <Text size={22}>{category.name}</Text>
        <Text size={14} variant="caption">
          {category.description}
        </Text>
      </View>
      {category.image && <Image source={{ uri: category.image.imageUrl }} style={styles.image} />}
    </ListItem>
  );
};

export default CategoryList;
