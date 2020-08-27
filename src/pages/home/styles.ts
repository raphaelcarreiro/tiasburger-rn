import styled, { css } from 'styled-components/native';

interface RestaurantStatusProps {
  status: boolean;
}

export const ListItem = styled.TouchableOpacity`
  padding: 10px;
  border-color: #eee;
  border-width: 0px;
  margin-right: 10px;
  min-height: 60px;
  background-color: #fff;
`;

export const RestaurantStatus = styled.View<RestaurantStatusProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: transparent;
  border-color: white;
  margin-right: 7px;

  ${({ status }) => css`
    background-color: ${status ? '#28a745' : '#dc3545'};
  `}
`;
