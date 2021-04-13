import React, { Fragment } from 'react';
import ProductComplementCategories from './ProductComplementCategories';
import ProductDetailAnnotation from '../ProductDetailAnnotation';
import ProductDetailDescription from '../ProductDetailDescription';
import ProductDetailImage from '../ProductDetailImage';
import { useProductComplement } from '../hooks/useProductComplement';

const ProductComplementDetail: React.FC = () => {
  const { product, setProduct } = useProductComplement();

  if (!product) return <Fragment />;

  return (
    <>
      <ProductDetailImage product={product} />
      <ProductDetailDescription product={product} />
      <ProductComplementCategories />
      <ProductDetailAnnotation product={product} setProduct={setProduct} />
    </>
  );
};

export default ProductComplementDetail;
