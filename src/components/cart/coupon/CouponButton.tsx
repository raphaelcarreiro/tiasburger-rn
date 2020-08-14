import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../bases/button/Button';
import { useSelector } from '../../../store/selector';
import { removeCoupon } from '../../../store/modules/cart/actions';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  coupon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});

type CouponButtonProps = {
  handleCouponVisibility(): void;
};

const CouponButton: React.FC<CouponButtonProps> = ({ handleCouponVisibility }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  function handleRemoveCoupon() {
    dispatch(removeCoupon());
  }

  return (
    <View style={styles.coupon}>
      {cart.coupon ? (
        <Button variant="text" onPress={handleRemoveCoupon} disablePadding>
          Remover {cart.coupon.name}
        </Button>
      ) : (
        <Button color="primary" variant="text" disablePadding onPress={handleCouponVisibility}>
          Aplicar cupom
        </Button>
      )}
    </View>
  );
};

export default CouponButton;
