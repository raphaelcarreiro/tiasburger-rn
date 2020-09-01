import React from 'react';
import Modal from '../../../components/modal/Modal';
import { Promotion } from '../../../@types/promotion';
import Typography from '../../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';
import Button from '../../../components/bases/button/Button';
import ListItem from '../../../components/list-item/ListItem';
import ProductList from '../../products/ProductList';

type PromotionViewProps = {
  promotion: Promotion | null;
  open: boolean;
  handleClose(): void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  action: {
    marginTop: 20,
  },
});

const PromotionView: React.FC<PromotionViewProps> = ({ promotion, open, handleClose }) => {
  return (
    <Modal open={open} handleClose={handleClose} title="Promoção">
      {promotion && (
        <View style={styles.container}>
          <Typography size={30} gutterBottom bold>
            {promotion.name}
          </Typography>
          <Typography gutterBottom size={20}>
            {promotion.description}
          </Typography>
          {promotion.valid_at && (
            <Typography variant="caption" size={14}>
              Válida até {promotion.formattedValidAt}
            </Typography>
          )}
          <View style={styles.action} />
        </View>
      )}
    </Modal>
  );
};

export default PromotionView;
