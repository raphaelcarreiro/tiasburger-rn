import React, { Fragment } from 'react';
import ProductPizzaComplementCategories from './ProductPizzaComplementCategories';
import ProductDetailAnnotation from '../ProductDetailAnnotation';
import ProductDetailDescription from '../ProductDetailDescription';
import ProductDetailImage from '../ProductDetailImage';
import { useProductPizza } from '../hooks/useProductPizza';

const ProductPizzaDetail: React.FC = () => {
  const { product, setProduct } = useProductPizza();

  if (!product) return <Fragment />;

  return (
    <>
      <ProductDetailImage product={product} />
      <ProductDetailDescription product={product} />
      <ProductPizzaComplementCategories />
      <ProductDetailAnnotation product={product} setProduct={setProduct} />
    </>
  );
};

export default ProductPizzaDetail;
