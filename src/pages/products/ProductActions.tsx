import React from 'react';
import AppBarAction from '../../components/appbar/AppBarAction';

interface ProductActionsProps {
  openSearchBox(): void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ openSearchBox }) => {
  return (
    <>
      <AppBarAction iconName="delete" onPress={openSearchBox} />
    </>
  );
};

export default ProductActions;
