import styled from 'styled-components/native';

export const AppBarStyled = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.primary};
  min-height: 56px;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
`;
