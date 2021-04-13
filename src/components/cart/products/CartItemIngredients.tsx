import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ingredient } from '../../../@types/product';
import Typography from '../../bases/typography/Text';

type CartItemIngredientsProps = {
  ingredients: Ingredient[];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    paddingTop: 5,
  },
  ingredientName: {
    color: '#c53328',
    marginRight: 7,
  },
});

const CartItemIngredients: React.FC<CartItemIngredientsProps> = ({ ingredients }) => {
  return (
    <View style={styles.container}>
      {ingredients
        .filter(ingredient => !ingredient.selected)
        .map(ingredient => (
          <Typography key={String(ingredient.id)} style={styles.ingredientName} size={14}>
            s/ {ingredient.name}
          </Typography>
        ))}
    </View>
  );
};

export default CartItemIngredients;
