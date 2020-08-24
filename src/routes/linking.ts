import { LinkingOptions } from '@react-navigation/native';
import { baseUrl, appUrlPrefix } from '../constants/constants';

export const linking: LinkingOptions = {
  prefixes: [baseUrl, appUrlPrefix],
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
