import React from 'react';
import IconButton from '../bases/icon-button/IconButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

interface AppBarActionProps extends TouchableOpacityProps {
  iconName: string;
  packageIcon?: 'mi' | 'mc'; // material icons or material community icons
  disabled?: boolean;
}

const AppBarAction: React.FC<AppBarActionProps> = ({ iconName, packageIcon = 'mc', ...rest }) => {
  const theme = useTheme();

  return (
    <IconButton
      {...rest}
      Icon={
        packageIcon === 'mc' ? (
          <Icon name={iconName} size={26} color={theme.contrast} />
        ) : (
          <IconMi name={iconName} size={26} color={theme.contrast} />
        )
      }
    />
  );
};

export default AppBarAction;
