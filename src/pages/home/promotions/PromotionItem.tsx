import React from 'react';
import Typography from '../../../components/bases/typography/Text';
import { Promotion } from '../../../@types/promotion';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { ListItem } from '../styles';

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  image: {
    width: 250,
    height: 250,
  },
  description: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: 10,
    height: 100,
  },
  descriptionText: {
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});

type PromotionItemProps = {
  promotion: Promotion;
  single: boolean;
  handleSelectPromotion(promotion: Promotion | null): void;
};

const PromotionItem: React.FC<PromotionItemProps> = ({ single, promotion, handleSelectPromotion }) => {
  return (
    <ListItem onPress={() => handleSelectPromotion(promotion)} style={styles.container}>
      <Image style={styles.image} source={{ uri: promotion.image?.imageUrl }} />
      <View style={styles.description}>
        <Typography style={styles.descriptionText} size={20} bold>
          {promotion.name}
        </Typography>
        <Typography style={styles.descriptionText} gutterBottom size={14}>
          {promotion.description}
        </Typography>
      </View>
    </ListItem>
  );
};

export default PromotionItem;
