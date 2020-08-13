import React, { ReactElement } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { AppBarStyled } from './styles';
import IconButton from '../bases/icon-button/IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components';
import Typography from '../bases/typography/Text';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  appBarButton: {
    marginRight: 15,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  title: {
    flex: 1,
  },
});

interface AppBarProps {
  title: string;
  subtitle?: string;
  actions?: ReactElement;
  backAction?: () => void;
  showBackAction?: boolean;
}

const AppBar: React.FC<AppBarProps> = ({ title, subtitle, actions, backAction, showBackAction }) => {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleToggle() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <View style={styles.container}>
      <AppBarStyled>
        <View style={styles.appBarButton}>
          {showBackAction && backAction ? (
            <IconButton onPress={backAction} Icon={<Icon name="arrow-back" size={26} color={theme.contrast} />} />
          ) : (
            <IconButton onPress={handleToggle} Icon={<Icon name="menu" size={26} color={theme.contrast} />} />
          )}
        </View>
        <View style={styles.title}>
          <Typography size={20} style={{ color: theme.contrast }}>
            {title}
          </Typography>
          {subtitle && <Typography style={{ color: theme.contrast }}>{subtitle}</Typography>}
        </View>
        {actions && <View style={styles.actions}>{actions}</View>}
      </AppBarStyled>
    </View>
  );
};

export default AppBar;
