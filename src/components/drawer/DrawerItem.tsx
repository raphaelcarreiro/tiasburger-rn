import React, { ReactElement } from 'react';
import { TouchableHighlight, TouchableHighlightProps, StyleSheet, View } from 'react-native';
import { useTheme } from 'styled-components';
import Typography from '../../components/bases/typography/Text';
import { useSelector } from '../../store/selector';
import { CartBadge } from './styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 13,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    maxWidth: 160,
  },
  iconContainer: {
    width: 60,
  },
});

interface DrawerItemProps extends TouchableHighlightProps {
  label: string;
  Icon: ReactElement;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, Icon, ...rest }) => {
  const { secondaryContrast } = useTheme();
  const { products } = useSelector(state => state.cart);

  return (
    <>
      <TouchableHighlight {...rest} style={styles.container} underlayColor="rgba(0, 0, 0, 0.1)">
        <>
          <View style={styles.iconContainer}>{Icon}</View>
          <Typography style={[styles.label, { color: secondaryContrast }]}>{label}</Typography>
          {label === 'carrinho' && products.length > 0 && (
            <CartBadge>
              <Typography size={12} bold color="contrast">
                {products.length}
              </Typography>
            </CartBadge>
          )}
        </>
      </TouchableHighlight>
    </>
  );
};

export default DrawerItem;
