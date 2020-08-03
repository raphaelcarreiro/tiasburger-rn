import styled from 'styled-components/native';
import { rgba } from 'polished';

interface ImageContainerType {
  isSelected: boolean;
}

export const ImageContainer = styled.TouchableOpacity`
  flex: 1;
  border-width: 1px;
  border-style: dashed;
  border-color: ${({ theme }) => theme.primary};
  height: 200px;
  padding: 5px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.View`
  background-color: ${props => rgba(props.theme.primary, 0.2)};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;
