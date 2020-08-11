import React from 'react';
import { Ingredient } from '../../../../../@types/product';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../../../components/bases/typography/Text';
import IngredientList from './ProductSimpleIngredientList';

type ProductSimpleIngredientsProps = {
  ingredients: Ingredient[];
  handleClickIngredient(ingredientId: number): void;
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  header: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#eee',
    padding: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

const ListHeader: React.FC = () => (
  <View style={styles.header}>
    <Typography bold size={22}>
      Ingredientes
    </Typography>
  </View>
);

const ProductSimpleIngredients: React.FC<ProductSimpleIngredientsProps> = ({ ingredients, handleClickIngredient }) => {
  return (
    <View style={styles.list}>
      <ListHeader />
      {ingredients.map(ingredient => (
        <IngredientList key={String(ingredient.id)} handleClick={handleClickIngredient} ingredient={ingredient} />
      ))}
    </View>
  );
};

export default ProductSimpleIngredients;
