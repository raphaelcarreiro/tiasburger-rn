import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
      <TouchableOpacity style={styles.button} onPress={handleStepPrior}>
        <Icon name="chevron-left" size={20} />
        <Typography size={18}>Anterior</Typography>
      </TouchableOpacity>
      {currentStep && currentStep.order < stepsAmount - 1 && (
        <TouchableOpacity style={styles.button} onPress={handleStepNext}>
          <Typography size={18}>Próximo</Typography>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CheckoutButtons;
