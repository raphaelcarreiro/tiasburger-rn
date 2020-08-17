import { moneyFormat } from '../../../helpers/numberFormat';
import { Cart, CartRestaurantConfigs, CartProduct } from '../../../@types/cart';
import {
  CartTypeActions,
  SET_CART,
  PREPARE_PRODUCT,
  ADD_PRODUCT,
  PROMOTION_ADD_PRODUCT,
  REMOVE_PRODUCT,
  PROMOTION_REMOVE_PRODUCT,
  INACTIVE_PROMOTION_REMOVE_PRODUCT,
  UPDATE_PRODUCT,
  RESTORE_CART,
  CREATE_HISTORY,
  CLEAR_CART,
  SET_CONFIGS,
  SET_COUPON,
  REMOVE_COUPON,
  SET_DISCOUNT,
  SET_TAX,
  UPDATE_TOTAL,
} from './types';
import Storage from '@react-native-community/async-storage';

export const INITIAL_STATE: Cart = {
  products: [],
  product: null,
  total: 0,
  history: [],
  configs: {} as CartRestaurantConfigs,
  coupon: null,
  discount: 0,
  subtotal: 0,
  tax: 0,
  formattedTax: 'R$ 0,00',
  formattedDiscount: 'R$ 0,00',
  formattedSubtotal: 'R$ 0,00',
  formattedTotal: 'R$ 0,00',
};

export default function cart(state = INITIAL_STATE, action: CartTypeActions): Cart {
  function addToCart(promotion?: { id: number; name: string }): Cart {
    if (!state.product) return state;
    const price =
      state.product.promotion_activated && state.product.special_price && state.product.special_price > 0
        ? state.product.special_price
        : state.product.price;
    let additionalPrice = 0;
    let finalPrice = 0;
    let complementsPrice = 0;
    let tastePrice = 0;
    let counterTaste = 0;
    let complementAdditionalPrice = 0;
    const tastePrices: number[] = [];

    state.product.additional.forEach(additional => {
      if (additional.selected) additionalPrice += additional.price;
    });

    // soma os preços dos complementos de pizza
    if (state.product.category.is_pizza)
      state.product.complement_categories.forEach(category => {
        category.complements.forEach(complement => {
          if (complement.selected) {
            counterTaste = category.is_pizza_taste && complement.selected ? counterTaste + 1 : counterTaste;
            complement.prices.forEach(price => {
              if (category.is_pizza_taste) {
                tastePrice = price.selected && price.price ? tastePrice + price.price : tastePrice;
                if (price.selected) tastePrices.push(price.price);
              } else
                complementsPrice = price.selected && price.price ? complementsPrice + price.price : complementsPrice;
            });
            complement.additional.forEach(additional => {
              if (additional.selected)
                additional.prices.forEach(price => {
                  complementAdditionalPrice = price.selected
                    ? price.price + complementAdditionalPrice
                    : complementAdditionalPrice;
                });
              return additional;
            });
          }
        });
      });
    // soma os preços dos complementos em geral
    else
      state.product.complement_categories.forEach(category => {
        complementsPrice = category.complements.reduce((sum, complement) => {
          return complement.selected && complement.price ? sum + complement.price : sum;
        }, complementsPrice);
      });

    // calcula do valor das pizzas
    if (counterTaste > 0) {
      if (state.configs.pizza_calculate === 'average_value') {
        tastePrice = tastePrice / counterTaste;
      } else if (state.configs.pizza_calculate === 'higher_value') {
        tastePrice = Math.max(...tastePrices);
      }

      complementsPrice = complementsPrice + tastePrice + complementAdditionalPrice;
    }

    finalPrice = promotion ? 0 : (price + additionalPrice + complementsPrice) * state.product.amount;

    const products: CartProduct[] = [
      ...state.products,
      {
        ...state.product,
        uid: new Date().getTime(),
        product_price: price,
        formattedProductPrice: moneyFormat(price),
        price: price + additionalPrice + complementsPrice,
        final_price: finalPrice,
        additionalPrice: additionalPrice,
        complementsPrice: complementsPrice,
        formattedPrice: moneyFormat(price + additionalPrice + complementsPrice),
        formattedFinalPrice: moneyFormat(finalPrice),
        promotion,
      },
    ];

    return {
      ...state,
      product: null,
      products,
    };
  }

  switch (action.type) {
    case SET_CART: {
      return action.cart;
    }

    case PREPARE_PRODUCT: {
      return {
        ...state,
        product: {
          ...action.product,
          amount: action.amount,
        },
      };
    }

    case ADD_PRODUCT: {
      return addToCart();
    }

    case PROMOTION_ADD_PRODUCT: {
      return addToCart({ id: action.promotionId, name: action.promotionName });
    }

    case REMOVE_PRODUCT: {
      const products = state.products.filter(product => product.uid !== action.productUid);

      return {
        ...state,
        products,
      };
    }

    case PROMOTION_REMOVE_PRODUCT: {
      const products = state.products.filter(product => {
        if (!product.promotion) return true;
        else return product.promotion.id !== action.promotionId;
      });

      return {
        ...state,
        products,
      };
    }

    case INACTIVE_PROMOTION_REMOVE_PRODUCT: {
      const products = state.products.filter(product => {
        if (!product.promotion) return true;
        else return action.promotions.some(promotion => promotion.id === product.promotion?.id);
      });

      return {
        ...state,
        products,
      };
    }

    case UPDATE_PRODUCT: {
      const price = action.product.product_price;
      let additionalPrice = 0;
      let finalPrice = 0;
      let complementsPrice = 0;
      let tastePrice = 0;
      let counterTaste = 0;
      let complementAdditionalPrice = 0;
      const tastePrices: number[] = [];

      action.product.additional.forEach(additional => {
        if (additional.selected) additionalPrice += additional.price;
      });

      // soma os preços dos complementos de pizza
      if (action.product.category.is_pizza)
        action.product.complement_categories.forEach(category => {
          category.complements.forEach(complement => {
            if (complement.selected) {
              counterTaste = category.is_pizza_taste && complement.selected ? counterTaste + 1 : counterTaste;
              complement.prices.forEach(price => {
                if (category.is_pizza_taste) {
                  tastePrice = price.selected && price.price ? tastePrice + price.price : tastePrice;
                  if (price.selected) tastePrices.push(price.price);
                } else
                  complementsPrice = price.selected && price.price ? complementsPrice + price.price : complementsPrice;
              });
              complement.additional.forEach(additional => {
                if (additional.selected)
                  additional.prices.forEach(price => {
                    complementAdditionalPrice = price.selected
                      ? price.price + complementAdditionalPrice
                      : complementAdditionalPrice;
                  });
                return additional;
              });
            }
          });
        });
      // soma os preços dos complementos em geral
      else
        action.product.complement_categories.forEach(category => {
          complementsPrice = category.complements.reduce((sum, complement) => {
            return complement.selected && complement.price ? sum + complement.price : sum;
          }, complementsPrice);
        });

      // calcula do valor das pizzas
      if (counterTaste > 0) {
        if (state.configs.pizza_calculate === 'average_value') {
          tastePrice = tastePrice / counterTaste;
        } else if (state.configs.pizza_calculate === 'higher_value') {
          tastePrice = Math.max(...tastePrices);
        }

        complementsPrice = complementsPrice + tastePrice + complementAdditionalPrice;
      }

      finalPrice = (price + additionalPrice + complementsPrice) * action.amount;

      const updatedProduct = {
        ...action.product,
        amount: action.amount,
        product_price: price,
        formattedProductPrice: moneyFormat(price),
        price: price + additionalPrice + complementsPrice,
        final_price: finalPrice,
        additionalPrice: additionalPrice,
        complementsPrice: complementsPrice,
        formattedPrice: moneyFormat(price + additionalPrice + complementsPrice),
        formattedFinalPrice: moneyFormat(finalPrice),
      };

      const products = state.products.map(product => {
        if (product.uid === updatedProduct.uid) {
          product = updatedProduct;
        }
        return product;
      });

      return {
        ...state,
        products,
      };
    }

    case RESTORE_CART: {
      return {
        ...state,
        products: state.history,
      };
    }

    case CREATE_HISTORY: {
      return {
        ...state,
        history: action.products,
      };
    }

    case CLEAR_CART: {
      Storage.removeItem('cart');
      return {
        ...INITIAL_STATE,
        configs: {
          ...state.configs,
        },
      };
    }

    case SET_CONFIGS: {
      return {
        ...state,
        configs: {
          ...state.configs,
          ...action.configs,
        },
      };
    }

    case SET_COUPON: {
      return {
        ...state,
        coupon: action.coupon,
      };
    }

    case REMOVE_COUPON: {
      return {
        ...state,
        coupon: null,
      };
    }

    case SET_TAX: {
      return {
        ...state,
        tax: action.tax,
        formattedTax: moneyFormat(action.tax),
      };
    }

    case SET_DISCOUNT: {
      const subtotal = state.products.reduce((sum, value) => sum + value.final_price, 0);

      return {
        ...state,
        discount: action.discountType === 'percent' ? subtotal * (action.discount / 100) : action.discount,
      };
    }

    case UPDATE_TOTAL: {
      const { configs } = state;
      const { coupon } = state;
      let tax = state.tax;
      let total = 0;
      let discount = 0 || state.discount;
      const subtotal = state.products.reduce((sum, value) => sum + value.final_price, 0);

      if (coupon) {
        discount = coupon.discount_type === 'percent' ? subtotal * (coupon.discount / 100) : coupon.discount;
      }

      if (configs.tax_mode === 'order_value') {
        if (action.shipmentMethod === 'delivery') {
          tax = configs.tax_value > 0 && subtotal < configs.order_minimum_value ? configs.tax_value : 0;
          total = subtotal < configs.order_minimum_value ? subtotal - discount + tax : subtotal - discount;
        } else {
          tax = 0;
          total = subtotal - discount;
        }
      } else if (configs.tax_mode === 'district' || configs.tax_mode === 'distance') {
        if (action.shipmentMethod === 'delivery') total = subtotal - discount + tax;
        else {
          tax = 0;
          total = subtotal - discount;
        }
      } else {
        tax = 0;
        total = subtotal - discount;
      }

      total = total < 0 ? 0 : total;

      return {
        ...state,
        tax,
        subtotal,
        total,
        discount,
        formattedSubtotal: moneyFormat(subtotal),
        formattedDiscount: moneyFormat(discount),
        formattedTax: moneyFormat(tax),
        formattedTotal: moneyFormat(total),
      };
    }

    default: {
      return state;
    }
  }
}
