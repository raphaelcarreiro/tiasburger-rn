import React, { useRef, useEffect, useCallback } from 'react';
import {
  Modal as NativeModal,
  ModalProps as NativeModalProps,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Animated,
  Pressable,
  Dimensions,
} from 'react-native';
import { DialogContext } from './dialogContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    flex: 1,
    left: 30,
    right: 30,
    minHeight: 200,
    borderRadius: 4,
    padding: 15,
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pressable: {
    flex: 1,
  },
});

interface DialogProps extends NativeModalProps {
  open: boolean;
  handleClose(): void;
  style?: StyleProp<ViewStyle>;
}

const initialValue = Dimensions.get('screen').width * -1 - 10;

const Dialog: React.FC<DialogProps> = ({ children, open, handleClose, ...rest }) => {
  const slide = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    Animated.timing(slide, {
      useNativeDriver: false,
      toValue: 0,
      duration: 100,
      delay: 150,
    }).start();
  }, [slide]);

  const handleCancelPress = useCallback(() => {
    Animated.timing(slide, {
      useNativeDriver: false,
      toValue: initialValue * -1,
      duration: 100,
    }).start();

    setTimeout(() => {
      handleClose();
    }, 150);
  }, [handleClose, slide]);

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
          <Animated.View style={[styles.container, { transform: [{ translateX: slide }] }]}>
            <DialogContext.Provider value={{ handleCancelPress }}>{children}</DialogContext.Provider>
          </Animated.View>
        </View>
      </Pressable>
    </NativeModal>
  );
};

export default Dialog;
