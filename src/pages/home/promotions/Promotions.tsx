import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Typography from '../../../components/bases/typography/Text';
import { useSelector } from '../../../store/selector';
import PromotionItem from './PromotionItem';
import PromotionView from './PromotionView';
import { Promotion } from '../../../@types/promotion';

const styles = StyleSheet.create({
  promotions: {
    marginTop: 20,
  },
  flatList: {
    paddingLeft: 15,
    margin: 0,
  },
  header: {
    marginLeft: 15,
    marginBottom: 10,
  },
});

const Promotions: React.FC = () => {
  const promotions = useSelector(state => state.promotions);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  return (
    <>
      {!!selectedPromotion && (
        <PromotionView
          open={!!selectedPromotion}
          handleClose={() => setSelectedPromotion(null)}
          promotion={selectedPromotion}
        />
      )}
      <View style={styles.promotions}>
        <View style={styles.header}>
          <Typography size={24} gutterBottom>
            promoções
          </Typography>
        </View>
        <FlatList
          horizontal
          data={promotions}
          keyExtractor={promotion => String(promotion.id)}
          renderItem={({ item: promotion }) => (
            <PromotionItem
              handleSelectPromotion={promotion => setSelectedPromotion(promotion)}
              single={promotions.length === 1}
              promotion={promotion}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      </View>
    </>
  );
};

export default Promotions;
