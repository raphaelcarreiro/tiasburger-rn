import React from 'react';
import { Ingredient } from '../../../../@types/product';
import { StyleSheet, View } from 'react-native';
import Typography from '../../../../components/bases/typography/Text';

type OrderProductIngredientsProps = {
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

const OrderProductIngredients: React.FC<OrderProductIngredientsProps> = ({ ingredients }) => {
  return (
    <View style={styles.container}>
      {ingredients.some(ingredient => !ingredient.selected) &&
        ingredients.map(
          ingredient =>
            !ingredient.selected && (
              <Typography key={String(ingredient.id)} style={styles.ingredientName} size={12}>
                s/ {ingredient.name}
              </Typography>
            ),
        )}
    </View>
  );
};

export default OrderProductIngredients;
