import styled from 'styled-components/native';
import { darken } from 'polished';

export const CartQuantity = styled.View`
  width: 22px;
  height: 22px;
  background-color: ${props => darken(0.2, props.theme.primary)};
  border-radius: 11px;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  left: 21px;
  top: -5px;
`;

export const CartQuantityText = styled.Text`
  color: ${props => props.theme.contrast};
  font-size: 14px;
`;
