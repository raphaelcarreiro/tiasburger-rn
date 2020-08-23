import styled, { css } from 'styled-components/native';

interface RestaurantStatusProps {
  status: boolean;
}

export const ListItem = styled.View`
  padding: 10px;
  border-color: ${props => props.theme.primary};
  border-width: 1px;
  margin-right: 10px;
  min-height: 80px;
  border-radius: 0px;
  background-color: ${props => props.theme.primaryLight};
`;

export const RestaurantStatus = styled.View<RestaurantStatusProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: green;
  border-color: white;
  margin-right: 7px;

  ${({ status }) => css`
    background-color: ${status ? 'green' : 'red'};
  `}
`;
