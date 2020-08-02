import React from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';

import { useTheme } from 'styled-components';
import AccountTab from './AccountTab';

const Account: React.FC = () => {
  const theme = useTheme();
  return (
    <>
      <Container>
        <AppBar hideShadow title="Minha conta" />
        <AccountTab />
      </Container>
    </>
  );
};

export default Account;
