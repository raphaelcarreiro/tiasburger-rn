import styled from 'styled-components/native';
import { OrderStatusOptions } from '../../../@types/order';

type OrderStatusBadgeProps = {
  status: OrderStatusOptions;
};

const backgroundColors = {
  p: '#17a2b8',
  o: '#ffc107',
  a: '#8BC34A',
  d: '#007bff',
  c: '#6c757d',
  x: '#dc3545',
};

export const OrderStatusBadge = styled.View<OrderStatusBadgeProps>`
  height: 26px;
  width: 26px;
  background-color: ${props => backgroundColors[props.status]};
  border-radius: 13px;
  margin-right: 10px;
`;
