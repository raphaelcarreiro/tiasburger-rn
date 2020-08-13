import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import Theme from './hooks/theme';
import MessageProvider from './hooks/message';
import AuthProvider from './hooks/auth';

if (__DEV__) {
  import('./config/reactotron').then(() => console.log('Reactotron Configured'));
}

const Index: React.FC = () => {
  return (
    <Provider store={store}>
      <Theme>
        <MessageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MessageProvider>
      </Theme>
    </Provider>
  );
};

export default Index;
