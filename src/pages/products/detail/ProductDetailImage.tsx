import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../../../@types/product';
import ImagePreview from '../../../components/image-preview/ImagePreview';

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 175,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 10,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 175,
  },
});

type ProductDetailImageProps = {
  product: Product;
};

const ProductDetailImage: React.FC<ProductDetailImageProps> = ({ product }) => {
  const [imagePreview, setImagePreview] = useState(false);

  return (
    <>
      <ImagePreview
        source={product.image.imageUrl}
        open={imagePreview}
        description={product.name}
        handleClose={() => setImagePreview(false)}
      />
      <TouchableOpacity onPress={() => setImagePreview(true)} style={styles.imageContainer}>
        <Image
          source={{ uri: product.image.thumbImageUlr ? product.image.thumbImageUlr : product.image.imageUrl }}
          style={styles.productImage}
        />
      </TouchableOpacity>
    </>
  );
};

export default ProductDetailImage;
