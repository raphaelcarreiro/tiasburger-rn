import React from 'react';
import { Additional } from '../../../../../@types/product';
import { View, StyleSheet } from 'react-native';
import Typography from '../../../../bases/typography/Text';
import AdditionalList from './ProductSimpleAdditionalList';

type ProductDetailAdditionalProps = {
  additional: Additional[];
  handleClickAdditional(additionalId: number): void;
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
      Adicionais
    </Typography>
  </View>
);

const ProductSimpleAdditional: React.FC<ProductDetailAdditionalProps> = ({ additional, handleClickAdditional }) => {
  return (
    <View style={styles.list}>
      <ListHeader />
      {additional.map(a => (
        <AdditionalList key={String(a.id)} handleClick={handleClickAdditional} additional={a} />
      ))}
    </View>
  );
};

export default ProductSimpleAdditional;
