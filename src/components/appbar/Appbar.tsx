import React from 'react';
import { Appbar as PaperAppBar } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

interface AppBarProps {
  title: string;
  subtitle?: string;
  hideShadow?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ title, subtitle, hideShadow }) => {
  const navigation = useNavigation();

  function handleToggle() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <View style={styles.container}>
      <PaperAppBar style={{ elevation: hideShadow ? 0 : 2 }}>
        <PaperAppBar.Action icon="menu" onPress={handleToggle} />
        <PaperAppBar.Content title={title} subtitle={subtitle && subtitle} />
      </PaperAppBar>
    </View>
  );
};

export default AppBar;
