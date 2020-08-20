import React from 'react';
import { StyleSheet } from 'react-native';
import { Additional } from '../../../../../@types/product';
import Typography from '../../../../bases/typography/Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { ListItemStyled } from '../../style';

type AdditionalListProps = {
  handleClick(additionalId: number): void;
  additional: Additional;
};

const styles = StyleSheet.create({
  listItem: {
    elevation: 0,
    borderWidth: 0,
  },
  icon: {
    height: 26,
    width: 26,
    borderRadius: 15,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 10,
  },
});

const ProductSimpleAdditionalList: React.FC<AdditionalListProps> = ({ additional, handleClick }) => {
  const theme = useTheme();

  return (
    <ListItemStyled selected={additional.selected} style={styles.listItem} onPress={() => handleClick(additional.id)}>
      <Typography gutterBottom>{additional.name}</Typography>
      {additional.price && (
        <Typography bold color="primary">
          + {additional.formattedPrice}
        </Typography>
      )}
      {additional.selected && <Icon name="check-circle" style={styles.icon} color={theme.primary} size={26} />}
    </ListItemStyled>
  );
};

export default ProductSimpleAdditionalList;
