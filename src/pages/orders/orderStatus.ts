import { OrderStatusOptions } from '../../@types/order';

export const orderStatus = {
  p: 'aguardando pagamento',
  o: 'aberto',
  a: 'aprovado',
  d: 'saiu para entrega',
  c: 'completo',
  x: 'cancelado',
};

export function orderStatusName(shipmentMethod: 'delivery' | 'customer_collect', status: OrderStatusOptions): string {
  if (status === 'd') {
    if (shipmentMethod === 'delivery') return 'saiu para entrega';
    else return 'pronto para retirada';
  }

  return orderStatus[status];
}
