import React, { Fragment } from 'react';
import { useProductSimple } from '../hooks/useSimpleProduct';
import ProductDetailAnnotation from '../ProductDetailAnnotation';
import ProductDetailDescription from '../ProductDetailDescription';
import ProductDetailImage from '../ProductDetailImage';
import ProductSimpleAdditional from './additional/ProductSimpleAdditional';
import ProductSimpleIngredients from './ingredients/ProductSimpleIngredient';

const ProductSimpleDetail: React.FC = () => {
  const { product, handleClickAdditional, handleClickIngredient, setProduct } = useProductSimple();

  if (!product) return <Fragment />;

  return (
    <>
      <ProductDetailImage product={product} />
      <ProductDetailDescription product={product} />
      {product.ingredients.length > 0 && (
        <ProductSimpleIngredients ingredients={product.ingredients} handleClickIngredient={handleClickIngredient} />
      )}
      {product.additional.length > 0 && (
        <ProductSimpleAdditional additional={product.additional} handleClickAdditional={handleClickAdditional} />
      )}
      <ProductDetailAnnotation product={product} setProduct={setProduct} />
    </>
  );
};

export default ProductSimpleDetail;
