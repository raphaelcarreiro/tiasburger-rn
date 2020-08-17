import React from 'react';
import Typography from '../bases/typography/Text';
import { TouchableOpacityProps, StyleSheet, TouchableOpacity } from 'react-native';

interface OptionsButton extends TouchableOpacityProps {
  title: string;
  color?: 'primary' | 'secondary' | 'error';
}

const styles = StyleSheet.create({
  button: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const OptionsButton: React.FC<OptionsButton> = ({ title, style, color, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Typography color={color} size={18}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

export default OptionsButton;
