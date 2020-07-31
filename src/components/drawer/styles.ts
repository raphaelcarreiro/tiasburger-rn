import styled from 'styled-components/native';

export const DrawerHeader = styled.View`
  height: 100px;
  background-color: ${props => props.theme.primary};
`;

export const DrawerHeaderText = styled.Text`
  color: #fff;
  font-size: 10px;
`;
