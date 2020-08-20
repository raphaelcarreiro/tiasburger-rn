import React, { useState, useEffect } from 'react';
import Input from '../../../bases/input/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  buttonBack: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  input: {
    height: 30,
    width: 200,
  },
});

type ProductPizzaSearchBoxProps = {
  handleSearch(categoryId: number, search: string): void;
  closeSearchBox(): void;
  categoryId: number;
};

const ProductPizzaSearchBox: React.FC<ProductPizzaSearchBoxProps> = ({ handleSearch, closeSearchBox, categoryId }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    handleSearch(categoryId, search);
  }, [search, categoryId, handleSearch]);

  function handleInputChange(text: string) {
    setSearch(text);
  }

  function handleClose() {
    closeSearchBox();
    handleSearch(categoryId, '');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleClose} style={styles.buttonBack}>
        <Icon name="arrow-back" size={26} />
      </TouchableOpacity>
      <Input
        containerStyle={styles.input}
        variant="standard"
        placeholder="Digite o sabor"
        value={search}
        onChange={event => handleInputChange(event.nativeEvent.text)}
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
      />
    </View>
  );
};

export default ProductPizzaSearchBox;
