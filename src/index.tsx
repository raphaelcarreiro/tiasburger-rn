import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import Theme from './hooks/theme';
import MessageProvider from './hooks/message';
import AuthProvider from './hooks/auth';
import codePush from 'react-native-code-push';

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

export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME })(Index);
