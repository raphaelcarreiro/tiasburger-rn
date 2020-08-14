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
  },
  label: {
    fontSize: 16,
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
  const { contrast } = useTheme();
  const { products } = useSelector(state => state.cart);

  return (
    <>
      <TouchableHighlight {...rest} style={styles.container} underlayColor="rgba(0, 0, 0, 0.1)">
        <>
          <View style={styles.iconContainer}>{Icon}</View>
          <Typography style={[styles.label, { color: contrast }]}>{label}</Typography>
          {label === 'Carrinho' && products.length > 0 && (
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
