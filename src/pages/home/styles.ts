import styled, { css } from 'styled-components/native';

interface RestaurantStatusProps {
  status: boolean;
}

export const ListItem = styled.TouchableOpacity`
  border-color: #eee;
  border-width: 0px;
  margin-right: 15px;
`;

export const RestaurantStatus = styled.View<RestaurantStatusProps>`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  background-color: transparent;
  border-color: white;
  margin-left: 5px;

  ${({ status }) => css`
    background-color: ${status ? '#28a745' : '#dc3545'};
  `}
`;
