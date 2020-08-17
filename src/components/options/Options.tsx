import React, { ReactElement, useRef, useEffect } from 'react';
import {
  Modal as NativeModal,
  ModalProps as NativeModalProps,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Pressable,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 200,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pressable: {
    flex: 1,
  },
});

interface OptionsProps extends NativeModalProps {
  open: boolean;
  handleClose(): void;
  title?: string;
  actions?: ReactElement;
  style?: StyleProp<ViewStyle>;
}

const Options: React.FC<OptionsProps> = ({ children, open, handleClose, ...rest }) => {
  const slide = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(slide, {
      useNativeDriver: true,
      toValue: 0,
      duration: 200,
      delay: 100,
    }).start();
  }, [slide]);

  function handleCancelPress() {
    Animated.timing(slide, {
      useNativeDriver: true,
      toValue: 300,
      duration: 100,
    }).start();

    setTimeout(() => {
      handleClose();
    }, 150);
  }

  return (
    <NativeModal
      animationType="fade"
      transparent
      statusBarTranslucent
      visible={open}
      {...rest}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.pressable} onPress={handleCancelPress}>
        <View style={styles.backdrop}>
          <Animated.View style={[styles.container, { transform: [{ translateY: slide }] }]}>{children}</Animated.View>
        </View>
      </Pressable>
    </NativeModal>
  );
};

export default Options;
