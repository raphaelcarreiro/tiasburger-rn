import React from 'react';
import { Ingredient } from '../../@types/product';
import { StyleSheet, View } from 'react-native';
import Typography from '../../components/bases/typography/Text';

type CartItemIngredientsProps = {
  ingredients: Ingredient[];
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
