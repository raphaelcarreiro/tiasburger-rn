import styled from 'styled-components/native';

export const ImageContainer = styled.View`
  flex: 1;
  border-width: 2px;
  border-style: dotted;
  border-color: ${({ theme }) => theme.primary};
  height: 200px;
  padding: 5px;
  border-radius: 4px;
  align-items: center;
`;
