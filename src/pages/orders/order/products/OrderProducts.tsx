import React from 'react';
import { CreatedOrderProduct } from '../../../../@types/product';
import ListItem from '../../../../components/list-item/ListItem';
import Typography from '../../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import OrderProductIngredients from './OrderProductIngredients';
import OrderProductComplements from './OrderProductComplements';
import OrderProductAdditional from './OrderProductAdditional';

type OrderProductsProps = {
  products: CreatedOrderProduct[];
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 50,
    justifyContent: 'center',
    paddingBottom: 5,
    borderBottomWidth: 0,
    borderBottomColor: '#eee',
    borderStyle: 'dashed',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

const OrderProducts: React.FC<OrderProductsProps> = ({ products }) => {
  return (
    <View style={styles.container}>
      <Typography bold size={18}>
        Itens
      </Typography>
      {products.map(product => (
        <ListItem style={styles.listItem} key={String(product.id)}>
          <View style={styles.row}>
            <View>
              <Typography bold>{product.name}</Typography>
              <Typography variant="caption">
                {product.amount} x {product.formattedPrice}
              </Typography>
            </View>
            <Typography size={16}>{product.formattedFinalPrice}</Typography>
          </View>
          {product.additional.length > 0 && <OrderProductAdditional additional={product.additional} />}
          {product.ingredients.length > 0 && <OrderProductIngredients ingredients={product.ingredients} />}
          {product.complement_categories.length > 0 && (
            <OrderProductComplements complementCategories={product.complement_categories} />
          )}
        </ListItem>
      ))}
    </View>
  );
};

export default OrderProducts;
