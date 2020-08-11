import React, { ReactElement } from 'react';
import {
  Modal as NativeModal,
  ModalProps as NativeModalProps,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import AppBar from '../appbar/Appbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
});

interface ModalProps extends NativeModalProps {
  open: boolean;
  handleClose(): void;
  title?: string;
  actions?: ReactElement;
  style?: StyleProp<ViewStyle>;
}

const Modal: React.FC<ModalProps> = ({ children, open, handleClose, title, actions, style, ...rest }) => {
  return (
    <NativeModal animationType="slide" transparent visible={open} {...rest} onRequestClose={handleClose}>
      <View style={[styles.container, style]}>
        {title && <AppBar title={title} showBackAction backAction={handleClose} actions={actions} />}
        {children}
      </View>
    </NativeModal>
  );
};

export default Modal;
