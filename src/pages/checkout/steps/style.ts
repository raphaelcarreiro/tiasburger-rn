import styled, { css } from 'styled-components/native';
import ListItem from '../../../components/list-item/ListItem';
import { lighten } from 'polished';

type ListItemStylesProps = {
  selected: boolean;
};

export const ListItemStyled = styled(ListItem)<ListItemStylesProps>`
  ${props =>
    props.selected &&
    css`
      background-color: ${lighten(0.4, props.theme.primary)};
      border-bottom-color: ${lighten(0.36, props.theme.primary)};
    `}
`;
