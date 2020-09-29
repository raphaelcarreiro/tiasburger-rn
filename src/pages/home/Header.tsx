import React from 'react';
import { useSelector } from '../../store/selector';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Typography from '../../components/bases/typography/Text';

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
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  image: {
    width: '100%',
    height: imageHeight,
    zIndex: 0,
  },
  logoWrapper: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 2,
    zIndex: 11,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  logo: {
    width: 40,
    height: 40,
  },
  description: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    paddingLeft: 20,
    paddingRight: 20,
    top: '10%',
  },
  descriptionColor: {
    color: '#fff',
  },
});

const Header: React.FC = () => {
  const restaurant = useSelector(state => state.restaurant);

  return (
    <>
      {restaurant && (
        <View style={styles.imageContainer}>
          {restaurant.cover && (
            <Image blurRadius={0.7} style={styles.image} source={{ uri: restaurant.cover.imageUrl }} />
          )}
          <View style={styles.imageWrapper} />
          <View style={styles.description}>
            <Typography size={30} style={styles.descriptionColor}>
              {restaurant.name}
            </Typography>
            <Typography gutterBottom size={16} style={styles.descriptionColor}>
              {restaurant.description}
            </Typography>
          </View>
          <View style={styles.logoWrapper}>
            <Image style={styles.logo} source={{ uri: restaurant.image.imageUrl }} />
          </View>
        </View>
      )}
    </>
  );
};

export default Header;
