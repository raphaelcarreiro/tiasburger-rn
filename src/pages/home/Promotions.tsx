import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Typography from '../../components/bases/typography/Text';
import { useSelector } from '../../store/selector';
import PromotionItem from './PromotionItem';

const styles = StyleSheet.create({
  promotions: {
    marginTop: 20,
  },
  flatList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const Promotions: React.FC = () => {
  const promotions = useSelector(state => state.promotions);

  return (
    <View style={styles.promotions}>
      <Typography size={16} bold gutterBottom align="center">
        Promoções
      </Typography>
      <FlatList
        horizontal
        data={promotions}
        keyExtractor={promotion => String(promotion.id)}
        renderItem={({ item: promotion }) => <PromotionItem single={promotions.length === 1} promotion={promotion} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

export default Promotions;
