import React from 'react';
import { StyleSheet, Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native';

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 6,
    borderRadius: 4,
    minHeight: 120,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

const ListItem: React.FC<TouchableOpacityProps> = ({ children, style, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={[styles.listItem, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default ListItem;
