import React, { useReducer, useContext, useEffect } from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import AccountTab from './AccountTab';
import AccountActions from './AccountActions';
import userReducer, {
  INITIAL_STATE as userCustomerInitialState,
  UserState,
} from '../../context-api/user-customer/reducer';
import { userChange, setUser as setUserCustomer } from '../../context-api/user-customer/actions';
import { useSelector } from '../../store/selector';
import { ScrollView, StyleSheet } from 'react-native';

interface AccountContextData {
  userCustomer: UserState;
  dispatch(action: any): void;
}

const AccountContext = React.createContext({} as AccountContextData);

export function useAccount(): AccountContextData {
  const context = useContext(AccountContext);
  return context;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

const Account: React.FC = () => {
  const [userCustomer, contextDispatch] = useReducer(userReducer, userCustomerInitialState);
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user) return;
    contextDispatch(
      setUserCustomer({
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.customer.cpf,
        image: user.image,
        isImageSelected: false,
      }),
    );
  }, [contextDispatch, user]);

  function handleSubmit(): void {
    //
  }

  function appBarGoBack() {
    contextDispatch(userChange('isImageSelected', !userCustomer.isImageSelected));
  }

  return (
    <AccountContext.Provider value={{ userCustomer, dispatch: contextDispatch }}>
      <AppBar
        hideShadow
        title={userCustomer.isImageSelected ? 'Foto' : 'Minha Conta'}
        backAction={appBarGoBack}
        showBackAction={userCustomer.isImageSelected}
        actions={<AccountActions handleSubmit={handleSubmit} />}
      />
      <Container>
        <AccountTab />
      </Container>
    </AccountContext.Provider>
  );
};

export default Account;
