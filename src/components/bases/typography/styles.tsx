import styled, { css } from 'styled-components/native';

interface TextProps {
  bold?: boolean;
  size?: number;
  gutterBottom: boolean;
}

export const StyledText = styled.Text<TextProps>`
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-size: ${props => props.size}px;
  font-family: 'sans-serif-light';

  ${props =>
    props.gutterBottom &&
    css`
      margin-bottom: 6px;
    `}
`;
