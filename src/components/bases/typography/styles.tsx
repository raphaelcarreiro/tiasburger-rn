import styled, { css } from 'styled-components/native';

interface TextProps {
  bold?: boolean;
  italic?: boolean;
  size?: number;
  gutterBottom?: boolean;
  variant?: 'caption' | 'default';
  color?: 'primary' | 'secondary' | 'contrast' | 'error';
  align?: 'right' | 'left' | 'center';
}

export const StyledText = styled.Text<TextProps>`
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  font-size: ${props => props.size}px;
  font-family: 'sans-serif-light';

  ${props =>
    props.italic &&
    css`
      font-style: italic;
    `}

  ${props =>
    props.color &&
    css`
      color: ${props.theme[props.color]};
    `}

  ${props =>
    props.variant === 'caption' &&
    css`
      color: #888;
    `}

  ${props =>
    props.gutterBottom &&
    css`
      margin-bottom: 6px;
    `}

  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
`;
