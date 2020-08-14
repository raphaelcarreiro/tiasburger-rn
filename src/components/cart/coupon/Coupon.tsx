import React, { useState } from 'react';
import Modal from '../../modal/Modal';
import Input from '../../bases/input/Input';
import api from '../../../services/api';
import { useDispatch } from 'react-redux';
import { setCoupon as setCouponAction } from '../../../store/modules/cart/actions';
import { Alert } from 'react-native';
import Loading from '../../loading/Loading';
import CouponActions from './CouponActions';

type CouponProps = {
  open: boolean;
  handleClose(): void;
};

const Coupon: React.FC<CouponProps> = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    setLoading(true);
    api
      .get(`/coupons/${coupon}`)
      .then(response => {
        dispatch(setCouponAction(response.data));
        setCoupon('');
        handleClose();
      })
      .catch(err => {
        if (err.response) console.log(err.response.data.error);
        else Alert.alert('Falha', 'Não foi possível aplicar o cupom de desconto');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Cupom"
      actions={<CouponActions loading={loading} handleSubmit={handleSubmit} />}
    >
      {loading && <Loading />}
      <Input
        label="Cupom"
        placeholder="Digite o cupom"
        variant="standard"
        autoFocus
        returnKeyType="send"
        value={coupon}
        onChange={event => setCoupon(event.nativeEvent.text)}
        onSubmitEditing={handleSubmit}
      />
    </Modal>
  );
};

export default Coupon;
