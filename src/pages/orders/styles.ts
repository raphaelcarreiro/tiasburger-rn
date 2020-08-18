import styled from 'styled-components/native';
import { OrderStatusOptions } from '../../@types/order';

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
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${props => backgroundColors[props.status]};
  padding: 5px;
  border-radius: 4px;
`;
