import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Footer from '../footer/Footer';

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});

interface DefaultLayoutProps {
  useScrollView?: boolean;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, useScrollView = true }) => {
  return useScrollView ? (
    <ScrollView contentContainerStyle={styles.scrollview}>
      {children}
      <Footer />
    </ScrollView>
  ) : (
    <View style={styles.container}>
      {children}
      <Footer />
    </View>
  );
};

export default DefaultLayout;
