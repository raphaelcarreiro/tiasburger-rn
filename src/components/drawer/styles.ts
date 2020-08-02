import styled from 'styled-components/native';
import { lighten } from 'polished';

interface RestaurantStatusData {
  status: boolean;
}

export const DrawerHeader = styled.View`
  flex-direction: row;
  height: 52px;
  background-color: ${props => props.theme.primary};
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
`;

export const DrawerHeaderText = styled.Text`
  color: #fff;
  font-size: 20px;
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
