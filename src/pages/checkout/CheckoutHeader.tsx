import React from 'react';
import { View, StyleSheet } from 'react-native';
import Typography from '../../components/bases/typography/Text';
import { StepType } from './steps/steps';
import { StepBadge } from './styles';

type CheckoutHeaderProps = {
  currentStep?: StepType;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  order: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ currentStep }) => {
  return (
    <View style={styles.container}>
      <StepBadge>
        <Typography size={18} bold color="contrast">
          {currentStep?.order}
        </Typography>
      </StepBadge>
      <Typography color="secondary">{currentStep?.description}</Typography>
    </View>
  );
};

export default CheckoutHeader;
