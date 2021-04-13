import { LinkingOptions } from '@react-navigation/native';
import { appUrlPrefix } from '../../restaurantConfig';
import { useSelector } from '../store/selector';

export function useLinking(): LinkingOptions {
  const restaurant = useSelector(state => state.restaurant);

  return {
    prefixes: [restaurant?.url || 'https://delivery.sgrande.app', appUrlPrefix],
    config: {
      screens: {
        Account: {
          path: 'account',
        },
        Orders: {
          path: 'orders',
        },
        Order: {
          path: 'account/orders/:orderId',
        },
        Menu: {
          path: 'menu',
        },
        Offers: {
          path: 'offers',
        },
        Products: {
          path: 'products/:url',
        },
        Cart: {
          path: 'cart',
        },
        Checkout: {
          path: 'checkout',
        },
      },
    },
  };
}
