import React from 'react';
import { StyleSheet } from 'react-native';
import { Ingredient } from '../../../../../@types/product';
import Typography from '../../../../bases/typography/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { ListItemStyled } from '../../style';

type IngredientListProps = {
  handleClick(additionalId: number): void;
  ingredient: Ingredient;
};

const styles = StyleSheet.create({
  listItem: {
    elevation: 0,
    borderWidth: 0,
  },
  icon: {
    height: 26,
    width: 26,
    borderRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 10,
  },
});

const ProductSimpleIngredientList: React.FC<IngredientListProps> = ({ ingredient, handleClick }) => {
  const theme = useTheme();

  return (
    <ListItemStyled selected={ingredient.selected} style={styles.listItem} onPress={() => handleClick(ingredient.id)}>
      <Typography>{ingredient.name}</Typography>
      {ingredient.selected && <Icon name="check-circle" style={styles.icon} color={theme.primary} size={26} />}
    </ListItemStyled>
  );
};

export default ProductSimpleIngredientList;
