import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CreatedOrder } from '../../../../@types/order';
import Button from '../../../../components/bases/button/Button';
import Typography from '../../../../components/bases/typography/Text';

const styles = StyleSheet.create({
  qrCodeImage: {
    width: 305,
    height: 305,
    marginBottom: 10,
    marginTop: 0,
  },
  container: {
    alignItems: 'center',
    marginTop: 10,
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderColor: '#eee',
    width: '100%',
    paddingTop: 10,
  },
  action: {
    marginTop: 20,
  },
});

interface CheckoutSuccessPixProps {
  order: CreatedOrder;
}

const CheckoutSucessPix: React.FC<CheckoutSuccessPixProps> = ({ order }) => {
  const [buttonText, setButtonText] = useState('copiar codigo qr');

  function handleCopyToClipboard() {
    if (!order.pix_payment) return;

    const code = order.pix_payment.qr_code;

    Clipboard.setString(code);

    setButtonText('copiado!');
    setTimeout(() => setButtonText('copiar código qr'), 2000);
  }

  return (
    <View style={styles.container}>
      <Typography size={14}>Código QR para pagamento com Pix</Typography>
      <View style={styles.action}>
        <Button style={{ width: 160 }} onPress={handleCopyToClipboard} variant="contained" color="primary">
          {buttonText}
        </Button>
      </View>
      <Image style={styles.qrCodeImage} source={{ uri: order.pix_payment?.qr_code_base64 }} />
      <Typography variant="caption" gutterBottom size={14}>
        Este código tem válidade de 10min
      </Typography>
      <Typography align="center" variant="caption" size={14}>
        Você deve procurar a opção de colar código QR no app onde será realizado o pagamento.
      </Typography>
    </View>
  );
};

export default CheckoutSucessPix;
