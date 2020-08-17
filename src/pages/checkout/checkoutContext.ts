import { createContext, useContext } from 'react';
import { StepOrderTypes, StepIdTypes } from './steps/steps';
import { Order } from '../../@types/order';
import { PaymentMethod } from '../../@types/paymentMethod';

type CheckoutContextData = {
  handleStepNext(): void;
  handleStepPrior(): void;
  handleSubmitOrder(): void;
  handleSetStep(step: StepOrderTypes): void;
  handleSetStepById(id: StepIdTypes): void;
  setIsCardValid(valid: boolean): void;
  isCardValid: boolean;
  saving: boolean;
  createdOrder: Order | null;
  step: number;
  paymentMethods: PaymentMethod[];
};

export const CheckoutContext = createContext<CheckoutContextData>({} as CheckoutContextData);

export function useCheckout(): CheckoutContextData {
  const context = useContext(CheckoutContext);
  return context;
}
