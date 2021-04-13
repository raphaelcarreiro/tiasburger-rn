import React, { useState } from 'react';
import Modal from '../../../components/modal/Modal';
import { Promotion } from '../../../@types/promotion';
import Typography from '../../../components/bases/typography/Text';
import { Image, ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import ImagePreview from '../../../components/image-preview/ImagePreview';

type PromotionViewProps = {
  promotion: Promotion;
  open: boolean;
  handleClose(): void;
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  description: {
    marginTop: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    paddingTop: 15,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 350,
  },
});

const PromotionView: React.FC<PromotionViewProps> = ({ promotion, open, handleClose }) => {
  const [imagePreview, setImagePreview] = useState(false);
  return (
    <Modal open={open} handleClose={handleClose} title={promotion?.name}>
      {imagePreview && promotion.image && (
        <ImagePreview
          open={imagePreview}
          handleClose={() => setImagePreview(false)}
          description={promotion.name}
          source={promotion.image.imageUrl}
        />
      )}
      {promotion && (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity onPress={() => setImagePreview(true)} style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: promotion.image?.imageUrl }} />
            </TouchableOpacity>
            <View style={styles.description}>
              <Typography gutterBottom color="primary">
                promoção
              </Typography>
              <Typography size={36} gutterBottom>
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
            </View>
          </ScrollView>
        </View>
      )}
    </Modal>
  );
};

export default PromotionView;
