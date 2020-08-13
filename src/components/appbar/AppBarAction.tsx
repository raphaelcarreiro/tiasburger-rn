import React from 'react';
import IconButton from '../bases/icon-button/IconButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

interface AppBarActionProps extends TouchableOpacityProps {
  iconName: string;
  disabled?: boolean;
}

const AppBarAction: React.FC<AppBarActionProps> = ({ iconName, ...rest }) => {
  const theme = useTheme();

  return <IconButton {...rest} Icon={<Icon name={iconName} size={26} color={theme.contrast} />} />;
};

export default AppBarAction;
