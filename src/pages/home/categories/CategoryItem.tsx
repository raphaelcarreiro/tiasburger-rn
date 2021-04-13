import React from 'react';
import Typography from '../../../components/bases/typography/Text';
import { Image, StyleSheet, View } from 'react-native';
import { ListItem } from '../styles';
import { Category } from '../../../@types/category';
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
  container: {
    width: 120,
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
  },
  description: {
    marginTop: 10,
  },
  descriptionText: {},
});

type CategoryItemProps = {
  category: Category;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const navigator = useNavigation();

  function handlePress(url: string, categoryName: string): void {
    navigator.navigate('Products', { url, categoryName });
  }

  return (
    <ListItem style={styles.container} onPress={() => handlePress(category.url, category.name)}>
      <Image style={styles.image} source={{ uri: category.image?.imageUrl }} />
      <View style={styles.description}>
        <Typography align="center" style={styles.descriptionText} variant="caption">
          {category.name}
        </Typography>
      </View>
    </ListItem>
  );
};

export default CategoryItem;
