import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../../components/bases/typography/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCheckout } from './checkoutContext';
import { StepType } from './steps/steps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  prior: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  next: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
    flex: 1,
  },
});

type CheckoutButtonsProps = {
  currentStep: StepType | undefined;
  stepsAmount: number;
};

const CheckoutButtons: React.FC<CheckoutButtonsProps> = ({ currentStep, stepsAmount }) => {
  const { handleStepPrior, handleStepNext } = useCheckout();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.prior} onPress={handleStepPrior}>
        <Icon name="chevron-left" size={20} />
        <Typography>Anterior</Typography>
      </TouchableOpacity>
      {currentStep && currentStep.order < stepsAmount - 1 && (
        <TouchableOpacity style={styles.next} onPress={handleStepNext}>
          <Typography>Próximo</Typography>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckoutButtons;
