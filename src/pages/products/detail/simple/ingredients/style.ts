import styled, { css } from 'styled-components/native';
import ListItem from '../../../../../components/list-item/ListItem';
import { lighten } from 'polished';

type ListItemStylesProps = {
  selected: boolean;
};

export const ListItemStyled = styled(ListItem)<ListItemStylesProps>`
  min-height: 50px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  position: relative;
  border-radius: 0;
  padding: 10px;

  ${props =>
    props.selected &&
    css`
      background-color: ${lighten(0.38, props.theme.primary)};
      border-bottom-color: ${lighten(0.34, props.theme.primary)};
    `};
`;
