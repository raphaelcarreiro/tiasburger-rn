import styled from 'styled-components/native';
import { lighten } from 'polished';

interface RestaurantStatusData {
  status: boolean;
}

export const DrawerHeader = styled.View`
  flex-direction: row;
  height: 56px;
  background-color: ${props => props.theme.primary};
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
`;

export const DrawerHeaderText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'sans-serif-light';
`;

export const RestaurantStatus = styled.View<RestaurantStatusData>`
  border-radius: 13px;
  background-color: red;
  height: 26px;
  width: 26px;
  border-width: 2px;
  border-color: ${lighten(0.15, '#28a745')};
  background-color: ${({ status }) => (status ? '#28a745' : '#dc3545')};
`;

export const CartBadge = styled.View`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 17px;
  right: 20px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primary};
  border-width: 2px;
  border-color: ${props => lighten(0.15, props.theme.primary)};
`;
