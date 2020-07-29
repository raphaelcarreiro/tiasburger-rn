import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import Theme from './hooks/theme';

const Index: React.FC = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Theme>
          <App />
        </Theme>
      </Provider>
    </NavigationContainer>
  );
};

export default Index;
