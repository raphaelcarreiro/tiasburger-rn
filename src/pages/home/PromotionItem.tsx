import React from 'react';
import Typography from '../../components/bases/typography/Text';
import { Promotion } from '../../@types/promotion';
import { Dimensions } from 'react-native';
import { ListItem } from './styles';

const width = Dimensions.get('screen').width - 20;

type PromotionItemProps = {
  promotion: Promotion;
  single: boolean;
};

const PromotionItem: React.FC<PromotionItemProps> = ({ single, promotion }) => {
  return (
    <ListItem style={[single ? { width } : { width: width * 0.9 }]}>
      <Typography bold color="contrast">
        {promotion.name}
      </Typography>
      <Typography color="contrast" size={12}>
        {promotion.description}
      </Typography>
    </ListItem>
  );
};

export default PromotionItem;
