import styled from 'styled-components/native';

export const ButtonNewAddress = styled.TouchableOpacity`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-style: dashed;
  border-width: 2px;
  border-color: ${({ theme }) => theme.primary};
  background-color: #fff;
  border-radius: 4px;
`;
