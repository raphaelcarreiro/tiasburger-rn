import React from 'react';
import Modal from '../../components/modal/Modal';
import { Promotion } from '../../@types/promotion';
import Typography from '../../components/bases/typography/Text';
import { StyleSheet, View } from 'react-native';

type PromotionViewProps = {
  promotion: Promotion | null;
  open: boolean;
  handleClose(): void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
  },
});

const PromotionView: React.FC<PromotionViewProps> = ({ promotion, open, handleClose }) => {
  return (
    <Modal open={open} handleClose={handleClose} title="Promoção">
      {promotion && (
        <View style={styles.container}>
          <Typography bold size={20} gutterBottom>
            {promotion.name}
          </Typography>
          <Typography>{promotion.description}</Typography>
          {promotion.valid_at && <Typography variant="caption">Válida até {promotion.formattedValidAt}</Typography>}
        </View>
      )}
    </Modal>
  );
};

export default PromotionView;
