import React, { ReactElement } from 'react';
import { Modal as NativeModal, ModalProps as NativeModalProps, StyleSheet, View } from 'react-native';
import AppBar from '../appbar/Appbar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingTop: 60,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
});

interface ModalProps extends NativeModalProps {
  open: boolean;
  handleClose(): void;
  title: string;
  actions?: ReactElement;
}

const Modal: React.FC<ModalProps> = ({ children, open, handleClose, title, actions }) => {
  return (
    <NativeModal animationType="slide" transparent visible={open}>
      <View style={styles.container}>
        <AppBar title={title} showBackAction backAction={handleClose} actions={actions} />
        {children}
      </View>
    </NativeModal>
  );
};

export default Modal;
