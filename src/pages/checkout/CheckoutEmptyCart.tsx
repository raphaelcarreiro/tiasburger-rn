import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../components/bases/typography/Text';
import Button from '../../components/bases/button/Button';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CheckoutEmptyCart: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Typography size={18} gutterBottom variant="caption" align="center">
        Você precisa escolher alguns itens para finalizar o pedido.
      </Typography>
      <Button color="primary" variant="text" onPress={() => navigation.navigate('Menu')}>
        Ir ao cardápio
      </Button>
    </View>
  );
};

export default CheckoutEmptyCart;
