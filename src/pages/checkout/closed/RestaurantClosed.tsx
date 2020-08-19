import React from 'react';
import { useDialog } from '../../../components/dialog/dialogContext';
import Typography from '../../../components/bases/typography/Text';
import Button from '../../../components/bases/button/Button';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    width: 80,
    position: 'absolute',
    bottom: 0,
  },
});

const RestaurantClosed: React.FC = () => {
  const { handleCancelPress } = useDialog();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Typography align="center" size={16}>
        {`Infelizmente não vamos poder te atender. O restaurante fechou`}
      </Typography>
      <Button style={styles.button} variant="text" color="primary" onPress={handleCancelPress}>
        OK
      </Button>
    </View>
  );
};

export default RestaurantClosed;
