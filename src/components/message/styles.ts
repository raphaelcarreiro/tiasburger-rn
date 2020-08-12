import styled from 'styled-components/native';
import { Dimensions, Animated } from 'react-native';

export const Container = styled(Animated.View)`
  flex: 1;
  background-color: #2a2a2a;
  position: absolute;
  left: 10px;
  right: 10px;
  min-height: 60px;
  border-radius: 4px;
  bottom: 0px;
  justify-content: space-between;
  padding: 15px 20px;
  margin: 10px;
  align-items: center;
  flex-direction: row;
  z-index: 20;
`;

export const MessageText = styled.Text`
  color: #f5f5f5;
  font-size: 15px;
`;

export const CloseButton = styled.TouchableOpacity`
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
