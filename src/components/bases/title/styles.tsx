import styled from 'styled-components/native';

interface TextProps {
  bold: boolean;
  size: number;
}

export const Text = styled.Text<TextProps>`
  font-weight: ${props => (props.bold ? 600 : 300)};
  font-size: ${props => props.size}px;
`;
