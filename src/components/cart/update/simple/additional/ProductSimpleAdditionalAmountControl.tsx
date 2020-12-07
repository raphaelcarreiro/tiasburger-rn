import React, { useEffect, useState } from 'react';
import IconButton from '../../../../../components/bases/icon-button/IconButton';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Typography from '../../../../../components/bases/typography/Text';
import { useTheme } from 'styled-components';

const styles = StyleSheet.create({
  amountControl: {
    alignItems: 'center',
    width: 70,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  amount: {
    marginLeft: 10,
    marginRight: 10,
  },
});

type ProductSimpleAdditionalAmountControlProps = {
  handleClickAdditional(additionalId: number, amount: number): void;
  additionalId: number;
  selectedAmount: number;
};

const ProductSimpleAdditionalAmountControl: React.FC<ProductSimpleAdditionalAmountControlProps> = ({
  handleClickAdditional,
  additionalId,
  selectedAmount = 0,
}) => {
  const [amount, setAmount] = useState(selectedAmount);
  const theme = useTheme();

  useEffect(() => {
    handleClickAdditional(additionalId, amount);
  }, [amount]); // eslint-disable-line

  function handleAmountUp() {
    setAmount(amount => amount + 1);
  }

  function handleAmountDown() {
    setAmount(amount => amount - 1);
  }

  return (
    <View style={styles.amountControl}>
      {amount > 0 && (
        <IconButton
          disabled={amount === 0}
          onPress={handleAmountDown}
          Icon={<Icon name="minus" size={26} color={theme.primary} />}
        />
      )}
      {amount !== 0 && (
        <Typography size={20} bold style={styles.amount}>
          {amount}
        </Typography>
      )}
      <IconButton onPress={handleAmountUp} Icon={<Icon name="plus" size={26} color={theme.primary} />} />
    </View>
  );
};

export default ProductSimpleAdditionalAmountControl;
