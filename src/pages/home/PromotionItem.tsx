import React from 'react';
import Typography from '../../components/bases/typography/Text';
import { Promotion } from '../../@types/promotion';
import { Dimensions } from 'react-native';
import { ListItem } from './styles';

const width = Dimensions.get('screen').width - 20;

type PromotionItemProps = {
  promotion: Promotion;
  single: boolean;
  handleSelectPromotion(promotion: Promotion | null): void;
};

const PromotionItem: React.FC<PromotionItemProps> = ({ single, promotion, handleSelectPromotion }) => {
  return (
    <ListItem onPress={() => handleSelectPromotion(promotion)} style={[single ? { width } : { width: width * 0.9 }]}>
      <Typography gutterBottom bold>
        {promotion.name}
      </Typography>
      <Typography size={12}>{promotion.description}</Typography>
      <Typography variant="caption" size={12}>
        Saber mais...
      </Typography>
    </ListItem>
  );
};

export default PromotionItem;
