import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../components/bases/typography/Text';
import AppBar from '../../components/appbar/Appbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Contact: React.FC = () => {
  return (
    <>
      <AppBar title="Contato" />
      <View style={styles.container}>
        <Typography>Contact</Typography>
      </View>
    </>
  );
};

export default Contact;
