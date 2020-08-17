import styled from 'styled-components/native';
import { darken } from 'polished';

export const StepBadge = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => props.theme.primary};
  border-color: ${props => darken(0.25, props.theme.primary)};
  border-width: 2px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;
