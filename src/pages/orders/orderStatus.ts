import { OrderStatusOptions } from '../../@types/order';

export const orderStatus = {
  p: 'Aguardando pagamento',
  o: 'Aberto',
  a: 'Aprovado',
  d: 'Saiu para entrega',
  c: 'Completo',
  x: 'Cancelado',
};

export function orderStatusName(shipmentMethod: 'delivery' | 'customer_collect', status: OrderStatusOptions): string {
  if (status === 'd') {
    if (shipmentMethod === 'delivery') return 'Saiu para entrega';
    else return 'Pronto para retirada';
  }

  return orderStatus[status];
}
