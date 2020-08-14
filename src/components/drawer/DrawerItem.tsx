import React, { ReactElement } from 'react';
import { TouchableHighlight, TouchableHighlightProps, StyleSheet, View } from 'react-native';
import { useTheme } from 'styled-components';
import Text from '../../components/bases/typography/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 25,
    paddingBottom: 10,
    paddingTop: 13,
  },
  label: {
    fontSize: 16,
  },
  iconContainer: {
    width: 60,
  },
});

interface DrawerItemProps extends TouchableHighlightProps {
  label: string;
  Icon: ReactElement;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, Icon, ...rest }) => {
  const { contrast } = useTheme();

  return (
    <>
      <TouchableHighlight {...rest} style={styles.container} underlayColor="rgba(0, 0, 0, 0.1)">
        <>
          <View style={styles.iconContainer}>{Icon}</View>
          <Text style={[styles.label, { color: contrast }]}>{label}</Text>
        </>
      </TouchableHighlight>
    </>
  );
};

export default DrawerItem;
