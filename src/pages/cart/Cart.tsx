import React from 'react';
import AppBar from '../../components/appbar/Appbar';
import CartComponent from '../../components/cart/Cart';

const Cart: React.FC = () => {
  return (
    <>
      <AppBar title="carrinho" />
      <CartComponent />
    </>
  );
};

export default Cart;
