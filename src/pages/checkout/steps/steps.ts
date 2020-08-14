export interface StepType {
  id: StepIdTypes;
  order: StepOrderTypes;
  title: string;
  description: string;
}

export type StepIdTypes = 'STEP_SHIPMENT_METHOD' | 'STEP_SHIPMENT' | 'STEP_PAYMENT' | 'STEP_CONFIRM' | 'STEP_SUCCESS';
export type StepOrderTypes = 1 | 2 | 3 | 4 | 5;

export const steps: StepType[] = [
  {
    id: 'STEP_SHIPMENT_METHOD',
    order: 1,
    title: 'Método de entrega',
    description: 'Qual é o método de entrega?',
  },
  {
    id: 'STEP_SHIPMENT',
    order: 2,
    title: 'Endereço de entrega',
    description: 'Qual é o endereço de entrega?',
  },
  {
    id: 'STEP_PAYMENT',
    order: 3,
    title: 'Pagamento',
    description: 'Como você vai pagar?',
  },
  {
    id: 'STEP_CONFIRM',
    order: 4,
    title: 'Finalizar',
    description: 'Confirmação do pedido',
  },
  {
    id: 'STEP_SUCCESS',
    order: 5,
    title: 'Pedido realizado',
    description: 'Recebemos seu pedido!',
  },
];
