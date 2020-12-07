import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Additional } from '../../../../../@types/product';
import Typography from '../../../../bases/typography/Text';
import { ListItemStyled } from '../../style';
import ProductSimpleAdditionalAmountControl from './ProductSimpleAdditionalAmountControl';

type AdditionalListProps = {
  handleClick(additionalId: number, amount: number): void;
  additional: Additional;
};

const styles = StyleSheet.create({
  listItem: {
    elevation: 0,
    borderWidth: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 26,
    width: 26,
    borderRadius: 13,
    position: 'absolute',
    right: 10,
  },
});

const ProductSimpleAdditionalList: React.FC<AdditionalListProps> = ({ additional, handleClick }) => {
  return (
    <ListItemStyled selected={additional.selected} style={styles.listItem}>
      <View>
        <Typography gutterBottom>{additional.name}</Typography>
        {additional.price > 0 && (
          <Typography bold color="primary">
            + {additional.formattedPrice}
          </Typography>
        )}
      </View>
      <ProductSimpleAdditionalAmountControl
        selectedAmount={additional.amount}
        additionalId={additional.id}
        handleClickAdditional={handleClick}
      />
    </ListItemStyled>
  );
};

export default ProductSimpleAdditionalList;
