import React, { useState, useCallback, useMemo, useEffect } from 'react';
import AppBar from '../../components/appbar/Appbar';
import { StyleSheet, View, Linking } from 'react-native';
import Modal from '../../components/modal/Modal';
import Cart from '../../components/cart/Cart';
import CheckoutActions from './CheckoutActions';
import { useMessage } from '../../hooks/message';
import { useApp } from '../../appContext';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../store/selector';
import { NavigationProp } from '@react-navigation/native';
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
import { PaymentMethod } from '../../@types/paymentMethod';
import Loading from '../../components/loading/Loading';
import InsideLoading from '../../components/loading/InsideLoading';
import CheckoutSuccess from './CheckoutSuccess';
import CheckoutEmptyCart from './CheckoutEmptyCart';
import CheckoutButtons from './CheckoutButtons';
import CheckoutHeader from './CheckoutHeader';
import { CheckoutContext } from './checkoutContext';
import ShipmentMethod from './steps/shipment-method/ShipmentMethod';
import Shipment from './steps/shipment/Shipment';
import { Address } from '../../@types/address';
import Payment from './steps/payment/Payment';
import Confirm from './steps/confirm/Confirm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 56,
    padding: 15,
    position: 'relative',
  },
  modal: {
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
});

type CheckoutProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const Checkout: React.FC<CheckoutProps> = ({ navigation }) => {
  const messaging = useMessage();
  const app = useApp();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const order = useSelector(state => state.order);
  const restaurant = useSelector(state => state.restaurant);
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [steps, setSteps] = useState<StepType[]>(defaultSteps);
  const [isCardValid, setIsCardValid] = useState(false);
  const [cartVisibility, setCartVisiblity] = useState(false);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setStep(1);
    });
  }, [navigation]);

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
    paymentMethods,
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
    if (!restaurant) return;

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
  }, [restaurant, order.shipment.shipment_method]);

  useEffect(() => {
    dispatch(setDiscount(cart.discount));
    if (cart.coupon) dispatch(setCoupon(cart.coupon));
  }, [dispatch, cart.discount, cart.coupon]);

  useEffect(() => {
    dispatch(setProducts(cart.products));
    dispatch(setTax(cart.tax));
  }, [dispatch, cart.products, cart.tax]);

  useEffect(() => {
    if (!restaurant) return;

    if (
      cart.subtotal < restaurant.configs.order_minimum_value &&
      restaurant.configs.tax_mode !== 'order_value' &&
      currentStep?.id !== 'STEP_SUCCESS' &&
      cart.products.length > 0
    ) {
      messaging.handleOpen(`Valor mínimo do pedido deve ser ${restaurant.configs.formattedOrderMinimumValue}`);
      navigation.navigate('Menu');
    }
  }, [restaurant, cart.subtotal, cart.products, currentStep, navigation, messaging]);

  useEffect(() => {
    function setAddress(address: Address) {
      if (restaurant?.configs.tax_mode === 'district') {
        if (address && address.area_region)
          dispatch(
            setShipmentAddress({
              ...address,
              complement: address.address_complement,
              shipment_method: 'delivery',
              scheduled_at: null,
              formattedScheduledAt: null,
            }),
          );
        else dispatch(setShipmentAddress({} as OrderShipment));
        return;
      } else if (restaurant?.configs.tax_mode === 'distance') {
        if (address && address.distance && address.distance <= restaurant?.delivery_max_distance)
          dispatch(
            setShipmentAddress({
              ...address,
              complement: address.address_complement,
              shipment_method: 'delivery',
              scheduled_at: null,
              formattedScheduledAt: null,
            }),
          );
        else dispatch(setShipmentAddress({} as OrderShipment));
        return;
      }

      if (address)
        dispatch(
          setShipmentAddress({
            ...address,
            complement: address.address_complement,
            shipment_method: 'delivery',
            scheduled_at: null,
            formattedScheduledAt: null,
          }),
        );
      else dispatch({} as OrderShipment);
    }

    if (user) {
      const customer = user.customer;
      const address = customer.addresses.find(address => address.is_main);

      dispatch(setCustomer(customer));
      if (address) setAddress(address);
    }
  }, [dispatch, restaurant, user]);

  useEffect(() => {
    api
      .get('/order/paymentMethods')
      .then(response => {
        setPaymentMethods(response.data);
        const paymentMethods: PaymentMethod[] = response.data;
        const offline = paymentMethods.some(method => method.mode === 'offline');
        if (offline) dispatch(setPaymentMethod(response.data[0]));
      })
      .catch(err => {
        if (err.response) console.log(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

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
      {cartVisibility && (
        <Modal style={styles.modal} open={cartVisibility} handleClose={handleCartVisibility} title="Carrinho">
          <Cart />
        </Modal>
      )}
      {saving && <Loading />}
      {loading ? (
        <InsideLoading />
      ) : currentStep?.id === 'STEP_SUCCESS' ? (
        <CheckoutContext.Provider value={checkoutContextValue}>
          <CheckoutSuccess />
        </CheckoutContext.Provider>
      ) : cart.products.length === 0 ? (
        <CheckoutEmptyCart />
      ) : (
        <CheckoutContext.Provider value={checkoutContextValue}>
          <View style={styles.container}>
            <CheckoutHeader currentStep={currentStep} />
            {currentStep?.id === 'STEP_SHIPMENT_METHOD' ? (
              <ShipmentMethod />
            ) : currentStep?.id === 'STEP_SHIPMENT' ? (
              <Shipment />
            ) : currentStep?.id === 'STEP_PAYMENT' ? (
              <Payment />
            ) : (
              currentStep?.id === 'STEP_CONFIRM' && <Confirm />
            )}
            {currentStep?.id !== 'STEP_SHIPMENT_METHOD' && (
              <CheckoutButtons currentStep={currentStep} stepsAmount={steps.length} />
            )}
          </View>
        </CheckoutContext.Provider>
      )}
    </>
  );
};

export default Checkout;
