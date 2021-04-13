import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ComplementCategory } from '../../../@types/product';
import Typography from '../../bases/typography/Text';

type CartItemComplementsProps = {
  complementCategories: ComplementCategory[];
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  category: {
    flexDirection: 'row',
  },
  categoryName: {
    minWidth: 70,
    marginRight: 10,
  },
  complement: {
    flexDirection: 'row',
  },
  complementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
});

const CartItemComplements: React.FC<CartItemComplementsProps> = ({ complementCategories }) => {
  return (
    <View style={styles.container}>
      {complementCategories.map(category => {
        const amount = category.complements.reduce((sum, complement) => (complement.selected ? sum + 1 : sum), 0);
        let count = 0;
        return (
          category.complements.some(complement => complement.selected) && (
            <View key={String(category.id)} style={styles.category}>
              <Typography bold size={12} style={styles.categoryName}>
                {category.name}
              </Typography>
              <View style={styles.complementsContainer}>
                {category.complements.map(complement => {
                  count = complement.selected ? count + 1 : count;
                  return (
                    complement.selected && (
                      <View style={styles.complement} key={String(complement.id)}>
                        <Typography size={12}>
                          {complement.name}
                          {amount > 1 && amount !== count && ', '}
                        </Typography>
                      </View>
                    )
                  );
                })}
              </View>
            </View>
          )
        );
      })}
    </View>
  );
};

export default CartItemComplements;
