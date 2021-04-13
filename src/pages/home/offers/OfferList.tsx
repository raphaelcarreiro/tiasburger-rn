import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import OfferItem from './OfferItem';
import { Product } from '../../../@types/product';

const styles = StyleSheet.create({
  flatList: {
    paddingLeft: 15,
    margin: 0,
  },
});

type OfferListProps = {
  products: Product[];
};

const OfferList: React.FC<OfferListProps> = ({ products }) => {
  return (
    <FlatList
      horizontal
      data={products}
      keyExtractor={product => String(product.id)}
      renderItem={({ item: product }) => <OfferItem product={product} />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatList}
    />
  );
};

export default OfferList;
