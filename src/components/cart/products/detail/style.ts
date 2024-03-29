import styled, { css } from 'styled-components/native';
import { darken } from 'polished';
import ListItem from '../../../list-item/ListItem';

type ListItemStylesProps = {
  selected: boolean;
};

export const ListItemStyled = styled(ListItem)<ListItemStylesProps>`
  min-height: 45px;
  justify-content: space-between;
  margin-bottom: 0;
  border-bottom-width: 1px;
  border-bottom-color: #f5f5f5;
  position: relative;
  border-radius: 0;
  flex-direction: row;
  align-items: center;

  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.primaryLight};
      border-bottom-color: ${darken(0.36, props.theme.primaryLight)};
    `}
`;
