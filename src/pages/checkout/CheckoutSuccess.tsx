import React from 'react';
import { useSelector } from '../../store/selector';
import Typography from '../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import { useCheckout } from './checkoutContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/bases/button/Button';
import { formatId } from '../../helpers/formatOrderId';
import { useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '../../routes/Routes';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    top: '20%',
  },
  message: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const CheckoutSuccess: React.FC = () => {
  const user = useSelector(state => state.user);
  const checkout = useCheckout();
  const order = checkout.createdOrder;
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  function handleFollowOrder() {
    if (order) navigation.navigate('Order', { orderId: order.encrypted_id });
  }

  return (
    <View style={styles.container}>
      {order && (
        <>
          <Icon name="check-circle" size={66} color="#3ac359" />
          <View style={styles.message}>
            <Typography align="center" size={26} gutterBottom>
              {user?.name}, recebemos seu pedido.
            </Typography>
            <Typography align="center">
              O número do pedido é <Typography bold>{formatId(order.id)}</Typography>
            </Typography>
          </View>
          <Button variant="text" color="primary" onPress={handleFollowOrder}>
            Acompanhar pedido
          </Button>
        </>
      )}
    </View>
  );
};

export default CheckoutSuccess;
