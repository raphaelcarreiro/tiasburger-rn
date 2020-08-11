import React from 'react';
import Modal from '../modal/Modal';
import { Image, StyleSheet, Dimensions, View, StatusBar } from 'react-native';
import Typography from '../bases/typography/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ImagePreviewProps = {
  source: string;
  description: string;
  handleClose(): void;
  open: boolean;
};

const WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  image: {
    width: WIDTH,
    height: '100%',
  },
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  description: {
    color: '#f5f5f5',
  },
  buttonClose: {
    marginRight: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
});

const ImagePreview: React.FC<ImagePreviewProps> = ({ source, description, handleClose, open }) => {
  return (
    <>
      <Modal open={open} handleClose={handleClose} style={styles.container}>
        <StatusBar backgroundColor="#000" translucent barStyle="default" />
        <View style={styles.header}>
          <Icon name="arrow-back" size={26} color="#fff" onPress={handleClose} style={styles.buttonClose} />
          <Typography bold size={24} style={styles.description}>
            {description}
          </Typography>
        </View>
        <Image resizeMode="contain" source={{ uri: source }} style={styles.image} />
      </Modal>
    </>
  );
};

export default ImagePreview;
