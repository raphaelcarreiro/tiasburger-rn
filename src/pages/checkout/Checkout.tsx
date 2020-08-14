import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Typography from '../../components/bases/typography/Text';
import AppBar from '../../components/appbar/Appbar';
import { StyleSheet, View, Linking } from 'react-native';
import Modal from '../../components/modal/Modal';
import Cart from '../../components/cart/Cart';
import CheckoutActions from './CheckoutActions';
import { useMessage } from '../../hooks/message';
import { useApp } from '../../App';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store/selector';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/Routes';
import { steps as defaultSteps, StepIdTypes, StepOrderTypes, StepType } from './steps/steps';
import {
  setTax,
  setDiscount,
  setShipmentAddress,
  setCustomer,
  setPaymentMethod,
  setProducts,
  setCoupon,
  setChange,
  clearCard,
} from '../../store/modules/order/actions';
import { OrderShipment, Order } from '../../@types/order';
import api from '../../services/api';
import { PaymnentMethod } from '../../@types/paymentMethod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
    padding: 15,
  },
  modal: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
});

type CheckoutContextData = {
  handleStepNext(): void;
  handleStepPrior(): void;
  handleSubmitOrder(): void;
  handleSetStep(step: StepOrderTypes): void;
  handleSetStepById(id: StepIdTypes): void;
  setIsCardValid(valid: boolean): void;
  isCardValid: boolean;
  saving: boolean;
  createdOrder: Order | null;
  step: number;
};

const CheckoutContext = React.createContext<CheckoutContextData>({} as CheckoutContextData);

const Checkout: React.FC = () => {
  const messaging = useMessage();
  const app = useApp();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const order = useSelector(state => state.order);
  const restaurant = useSelector(state => state.restaurant);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymnentMethod[]>([]);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [steps, setSteps] = useState<StepType[]>(defaultSteps);
  const [isCardValid, setIsCardValid] = useState(false);
  const [cartVisibility, setCartVisiblity] = useState(false);

  const currentStep = useMemo(() => {
    return steps.find(item => item.order === step);
  }, [step, steps]);

  const checkoutContextValue = {
    handleStepNext: handleStepNext,
    handleStepPrior: handleStepPrior,
    handleSubmitOrder: handleSubmitOrder,
    handleSetStep: handleSetStep,
    handleSetStepById: handleSetStepById,
    setIsCardValid: setIsCardValid,
    isCardValid,
    saving,
    createdOrder,
    step,
  };

  const handleCartVisibility = useCallback(() => {
    setCartVisiblity(!cartVisibility);
  }, [cartVisibility]);

  useEffect(() => {
    if (restaurant)
      if (restaurant.configs.facebook_pixel_id) {
        // fbq('track', 'InitiateCheckout');
      }
  }, [restaurant]);

  useEffect(() => {
    if (restaurant?.id) {
      const { configs } = restaurant;

      let stepId: StepOrderTypes = 1;
      let newSteps = defaultSteps.slice();

      if (!configs.customer_collect) {
        newSteps = newSteps.filter(s => s.id !== 'STEP_SHIPMENT_METHOD');
      }

      if (order.shipment.shipment_method === 'customer_collect') {
        newSteps = newSteps.filter(s => s.id !== 'STEP_SHIPMENT');
      }

      setSteps(
        newSteps.map(step => {
          step.order = stepId;
          stepId++;
          return step;
        }),
      );
    }
  }, [restaurant, order.shipment.shipment_method]);

  useEffect(() => {
    if (restaurant) {
      dispatch(setTax(cart.tax));
      dispatch(setDiscount(cart.discount));
      if (
        cart.subtotal < restaurant.configs.order_minimum_value &&
        restaurant.configs.tax_mode !== 'order_value' &&
        currentStep?.id !== 'STEP_SUCCESS' &&
        cart.products.length > 0
      ) {
        messaging.handleOpen(`Valor mínimo do pedido deve ser ${restaurant.configs.formattedOrderMinimumValue}`);
        navigation.navigate('Menu');
      }
    }
  }, [cart.total, restaurant]);

  useEffect(() => {
    handleCartVisibility();

    function setAddress(address: OrderShipment) {
      if (restaurant?.configs.tax_mode === 'district') {
        if (address && address.area_region) dispatch(setShipmentAddress(address));
        else dispatch(setShipmentAddress({} as OrderShipment));
        return;
      } else if (restaurant?.configs.tax_mode === 'distance') {
        if (address && address.distance <= restaurant?.delivery_max_distance) dispatch(setShipmentAddress(address));
        else dispatch(setShipmentAddress({} as OrderShipment));
        return;
      }

      dispatch(setShipmentAddress(address || {}));
    }

    if (user) {
      const customer = user.customer;
      const address = customer.addresses.find(address => address.is_main);

      dispatch(setCustomer(customer));
      setAddress(address);
    }
  }, []);

  useEffect(() => {
    api
      .get('/order/paymentMethods')
      .then(response => {
        setPaymentMethods(response.data);
        const paymentMethods: PaymnentMethod[] = response.data;
        // const online = paymentMethods.some(method => method.mode === 'online');
        const offline = paymentMethods.some(method => method.mode === 'offline');
        if (offline) dispatch(setPaymentMethod(response.data[0]));
      })
      .catch(err => {
        if (err.response) console.log(err.response.data.error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setProducts(cart.products));
    if (cart.coupon) dispatch(setCoupon(cart.coupon));
  }, []);

  function handleSubmitOrder() {
    if (restaurant)
      if (cart.subtotal < restaurant.configs.order_minimum_value && restaurant.configs.tax_mode !== 'order_value') {
        messaging.handleOpen(`Valor mínimo do pedido deve ser ${restaurant.configs.formattedOrderMinimumValue}`);
        return;
      }

    setSaving(true);
    api
      .post('/orders', order)
      .then(response => {
        setCreatedOrder(response.data);

        if (response.data.picpay_payment) {
          Linking.canOpenURL(response.data.picpay_payment.payment_url).then(supported => {
            if (supported) Linking.openURL(response.data.picpay_payment.payment_url);
            else console.log('It is not possible open url');
          });
        }
        dispatch(setChange(0));
        dispatch(clearCard());
        dispatch(clearCard());
        handleStepNext();
      })
      .catch(err => {
        if (err.response) console.log(err.response.data.error);
      })
      .finally(() => {
        setSaving(false);
      });
  }

  async function handleStepNext() {
    if (currentStep?.id === 'STEP_SHIPMENT') {
      if (!order.shipment.id) {
        messaging.handleOpen('Informe o endereço');
        return;
      }
    } else if (currentStep?.id === 'STEP_PAYMENT') {
      if (!order.paymentMethod) {
        messaging.handleOpen('Selecione uma forma de pagamento');
        return;
      }
    }
    setStep(step + 1);
  }

  function handleStepPrior() {
    if (step > 1) setStep(step - 1);
  }

  function handleSetStep(step: StepOrderTypes) {
    if (step < 1 || step > 4) return;
    setStep(step);
  }

  function handleSetStepById(id: StepIdTypes) {
    const step = steps.find(s => s.id === id);
    if (step) setStep(step.order);
  }

  return (
    <>
      <AppBar title="Finalizar pedido" actions={<CheckoutActions handleCartVisilibity={handleCartVisibility} />} />
      <Modal style={styles.modal} open={cartVisibility} handleClose={handleCartVisibility} title="Carrinho">
        <Cart />
      </Modal>
      <CheckoutContext.Provider value={checkoutContextValue}>
        <View style={styles.container}>
          <Typography>Checkout</Typography>
        </View>
      </CheckoutContext.Provider>
    </>
  );
};

export default Checkout;
