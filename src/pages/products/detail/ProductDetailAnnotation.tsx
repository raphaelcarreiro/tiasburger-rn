import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import { CartProduct } from '../../../@types/cart';
import { Product } from '../../../@types/product';
import InputText from '../../../components/bases/input/Input';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
  },
});

type ProductDetailAnnotationProps = {
  product: Product | CartProduct;
  setProduct: Dispatch<SetStateAction<Product | null>> | Dispatch<SetStateAction<CartProduct | null>>;
};

const ProductDetailAnnotation: React.FC<ProductDetailAnnotationProps> = ({ product, setProduct }) => {
  function handleChange(annotation: string) {
    setProduct(state => {
      return {
        ...state,
        annotation,
      };
    });
  }

  return (
    <View style={styles.inputContainer}>
      <InputText
        label="Observação"
        placeholder="Exemplo: quero com carne bem passada"
        variant="outlined"
        numberOfLines={5}
        multiline
        textAlignVertical="top"
        autoCorrect
        returnKeyType="done"
        value={product.annotation}
        onChange={event => handleChange(event.nativeEvent.text)}
      />
    </View>
  );
};

export default ProductDetailAnnotation;
