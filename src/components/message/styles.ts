import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #2a2a2a;
  position: absolute;
  width: ${Dimensions.get('window').width - 20}px;
  min-height: 60px;
  bottom: 0px;
  border-radius: 4px;
  justify-content: space-between;
  padding: 15px 20px;
  z-index: 20;
  margin: 10px;
  align-items: center;
  flex-direction: row;
`;

export const MessageText = styled.Text`
  color: #f5f5f5;
  font-size: 15px;
`;

export const CloseButton = styled(RectButton)`
  background-color: transparent;
  padding: 5px;
`;

export const CloseButtonText = styled.Text`
  color: ${props => props.theme.primary};
  text-transform: uppercase;
  font-size: 14px;
`;

export const MessageTextContainer = styled.View`
  max-width: 80%;
`;
