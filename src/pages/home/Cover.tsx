import React from 'react';
import { useSelector } from '../../store/selector';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

const imageHeight = Dimensions.get('screen').height * 0.4;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 56,
    position: 'relative',
    height: imageHeight,
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  image: {
    width: '100%',
    height: imageHeight,
    zIndex: 0,
  },
});

const Cover: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);

  return (
    <>
      {restaurant && (
        <View style={styles.imageContainer}>
          {restaurant.cover && (
            <Image blurRadius={0.7} style={styles.image} source={{ uri: restaurant.cover.imageUrl }} />
          )}
          <View style={styles.imageWrapper} />
        </View>
      )}
    </>
  );
};

export default Cover;
