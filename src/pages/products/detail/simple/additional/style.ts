import styled, { css } from 'styled-components/native';
import ListItem from '../../../../../components/list-item/ListItem';
import { lighten } from 'polished';

type ListItemStylesProps = {
  selected: boolean;
};

export const ListItemStyled = styled(ListItem)<ListItemStylesProps>`
  min-height: 40px;
  justify-content: center;
  margin-bottom: 0;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  position: relative;
  border-radius: 0;

  ${props =>
    props.selected &&
    css`
      background-color: ${lighten(0.5, props.theme.primary)};
      border-bottom-color: ${lighten(0.3, props.theme.primary)};
    `}
`;
