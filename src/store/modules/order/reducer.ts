import ptBR, { format } from 'date-fns';
import { Order, OrderShipment } from '../../../@types/order';
import {
  OrderTypeActions,
  SET_CUSTOMER,
  SET_SHIPMENT_ADDRESS,
  SET_SHIPMENT_METHOD,
  SET_PAYMENT_METHOD,
  SET_PRODUCTS,
  SET_CHANGE,
  SET_CARD,
  CHANGE_CREDITCARD,
  CHANGE,
  SET_INITIAL_STATE,
  CLEAR_CARD,
  SET_DISCOUNT,
  SET_COUPON,
  SET_TAX,
  SET_SCHEDULE,
} from './types';

const INITIAL_STATE: Order = {
  shipment: {} as OrderShipment,
  customer: null,
  paymentMethod: null,
  products: [],
  change: 0,
  creditCard: {
    number: '',
    name: '',
    card_id: '',
    expiration_date: '',
    cvv: '',
    cpf: '',
  },
  coupon: null,
  tax: 0,
  discount: 0,
};

export default function order(state = INITIAL_STATE, action: OrderTypeActions): Order {
  switch (action.type) {
    case SET_CUSTOMER: {
      return {
        ...state,
        customer: action.customer,
      };
    }

    case SET_SHIPMENT_ADDRESS: {
      return {
        ...state,
        shipment: {
          ...action.address,
          shipment_method: 'delivery',
        },
      };
    }

    case SET_SHIPMENT_METHOD: {
      return {
        ...state,
        shipment: {
          ...state.shipment,
          shipment_method: action.shipmentMethod,
        },
      };
    }

    case SET_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.paymentMethod,
        change: action.paymentMethod && action.paymentMethod.kind === 'money' ? state.change : 0,
      };
    }

    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.products,
      };
    }

    case SET_CHANGE: {
      return {
        ...state,
        change: action.value,
      };
    }

    case SET_CARD: {
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          ...action.card,
        },
      };
    }

    case CHANGE_CREDITCARD: {
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          [action.index]: action.value,
        },
      };
    }

    case CHANGE: {
      return {
        ...state,
        [action.index]: action.value,
      };
    }

    case SET_INITIAL_STATE: {
      return INITIAL_STATE;
    }

    case CLEAR_CARD: {
      return {
        ...state,
        creditCard: {
          number: '',
          name: '',
          card_id: '',
          expiration_date: '',
          cvv: '',
          cpf: '',
        },
      };
    }

    case SET_COUPON: {
      return {
        ...state,
        coupon: action.coupon,
      };
    }

    case SET_TAX: {
      return {
        ...state,
        tax: action.tax,
      };
    }

    case SET_DISCOUNT: {
      return {
        ...state,
        discount: action.discount,
      };
    }

    case SET_SCHEDULE: {
      return {
        ...state,
        shipment: {
          ...state.shipment,
          scheduled_at: action.date,
          formattedScheduledAt: action.date ? format(action.date, 'HH:mm', { locale: ptBR }) : null,
        },
      };
    }

    default: {
      return state;
    }
  }
}
