import React, { useState } from 'react';
import { Container } from './styles';
import AppBar from '../../components/appbar/Appbar';
import Typography from '../../components/bases/typography/Text';
import Dialog from '../../components/dialog/Dialog';
import Button from '../../components/bases/button/Button';
import { useDialog } from '../../components/dialog/dialogContext';

const DialogContext = () => {
  const dialog = useDialog();
  return (
    <Button variant="text" color="primary" onPress={dialog.handleCancelPress}>
      Fechar
    </Button>
  );
};

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <AppBar title="Início" />
      <Typography>Home</Typography>
      {open && (
        <Dialog open={open} handleClose={() => setOpen(false)}>
          <DialogContext />
        </Dialog>
      )}
      <Button onPress={() => setOpen(true)} variant="text" color="primary">
        Open Dialog
      </Button>
    </Container>
  );
};

export default Home;
