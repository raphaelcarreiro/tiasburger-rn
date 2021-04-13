import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import CategoryList from './CategoryList';
import { Category } from '../../../@types/category';
import api from '../../../services/api';

const styles = StyleSheet.create({
  promotions: {
    marginTop: 20,
  },

  header: {
    marginLeft: 15,
    marginBottom: 10,
  },
});

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get<Category[]>('/categories').then(response => {
      setCategories(response.data.filter(category => category.activated));
    });
  }, []);

  return (
    <View style={styles.promotions}>
      <View style={styles.header}>
        <Typography size={24} gutterBottom>
          cardápio
        </Typography>
      </View>
      <CategoryList categories={categories} />
    </View>
  );
};

export default Categories;
