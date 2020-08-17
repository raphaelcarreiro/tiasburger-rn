import React, { useState } from 'react';
import { PaymentMethod } from '../../../../@types/paymentMethod';
import { ListItemStyled } from '../style';
import Typography from '../../../../components/bases/typography/Text';
import { useSelector } from '../../../../store/selector';
import { StyleSheet, View } from 'react-native';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setPaymentMethod } from '../../../../store/modules/order/actions';
import { useCheckout } from '../../checkoutContext';

type PaymentOnlineMethodProps = {
  paymentMethod: PaymentMethod;
  openModalCard(): void;
};

const styles = StyleSheet.create({
  listItem: {
    minHeight: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 35,
    marginRight: 10,
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

const PaymentOnlineMethod: React.FC<PaymentOnlineMethodProps> = ({ paymentMethod, openModalCard }) => {
  const orderPaymentMethod = useSelector(state => state.order).paymentMethod;
  const theme = useTheme();
  const dispatch = useDispatch();
  const checkout = useCheckout();
  const user = useSelector(state => state.user);

  function handlePress(paymentMethod: PaymentMethod) {
    dispatch(setPaymentMethod(paymentMethod));

    if (paymentMethod.kind === 'picpay') {
      if (!user?.customer.cpf) {
        // setModalCpf(true);
        return;
      }
    } else if (paymentMethod.kind === 'card') {
      openModalCard();
      return;
    }

    checkout.handleSetStepById('STEP_CONFIRM');
  }

  return (
    <ListItemStyled
      onPress={() => handlePress(paymentMethod)}
      style={styles.listItem}
      selected={paymentMethod.id === orderPaymentMethod?.id}
    >
      <View style={[styles.avatar, { borderColor: theme.primary }]}>
        {paymentMethod.kind === 'card' && <Icon color={theme.primary} name="credit-card" size={20} />}
        {paymentMethod.kind === 'picpay' && <McIcon color={theme.primary} name="cellphone-android" size={20} />}
      </View>
      <Typography>{paymentMethod.method}</Typography>
      {paymentMethod.id === orderPaymentMethod?.id && (
        <View style={styles.iconContainer}>
          <McIcon name="check-circle" color={theme.primary} size={26} />
        </View>
      )}
    </ListItemStyled>
  );
};

export default PaymentOnlineMethod;
