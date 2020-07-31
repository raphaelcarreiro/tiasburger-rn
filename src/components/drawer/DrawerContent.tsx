import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { useTheme } from 'styled-components';
import { DrawerHeader, DrawerHeaderText } from './styles';

const Drawer: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <DrawerContentScrollView>
      <DrawerHeader>
        <DrawerHeaderText>Custom drawer</DrawerHeaderText>
      </DrawerHeader>
    </DrawerContentScrollView>
  );
};

export default Drawer;
