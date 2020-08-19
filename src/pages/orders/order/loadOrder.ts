import { useCallback, useState } from 'react';
import api from '../../../services/api';
import { CreatedOrder } from '../../../@types/order';
import { formatId } from '../../../helpers/formatOrderId';
import { parseISO, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { moneyFormat } from '../../../helpers/numberFormat';
import { orderStatusName } from '../orderStatus';

type useLoadOrderType = [
  CreatedOrder | null,
  (orderId: number | string) => Promise<void>,
  boolean,
  React.Dispatch<React.SetStateAction<CreatedOrder | null>>,
];

export function useLoadOrder(): useLoadOrderType {
  const [order, setOrder] = useState<CreatedOrder | null>(null);
  const [error, setError] = useState(false);

  const loadOrder = useCallback(async orderId => {
    try {
      const response = await api.get(`orders/${orderId}`);
      const _order: CreatedOrder = response.data;
      const formattedId = formatId(_order.id);
      const date = parseISO(_order.created_at);

      setOrder({
        ..._order,
        formattedId,
        formattedDate: format(date, "PP 'às' p", { locale: ptBR }),
        formattedChange: moneyFormat(_order.change),
        formattedTax: moneyFormat(_order.tax),
        products: _order.products.map(product => {
          product.formattedFinalPrice = moneyFormat(product.final_price);
          product.formattedPrice = moneyFormat(product.price);
          product.formattedProductPrice = moneyFormat(product.product_price);
          product.complement_categories = product.complement_categories.map(category => {
            category.complements = category.complements.map(complement => {
              complement.formattedPrice = moneyFormat(complement.price || null);
              complement.additional = complement.additional.map(additional => {
                additional.prices = additional.prices.map(price => {
                  price.formattedPrice = moneyFormat(price.price);
                  return price;
                });
                return additional;
              });
              return complement;
            });
            return category;
          });
          product.additional = product.additional.map(additional => {
            additional.formattedPrice = moneyFormat(additional.price);
            return additional;
          });
          return product;
        }),
        formattedSubtotal: moneyFormat(_order.subtotal),
        formattedDiscount: moneyFormat(_order.discount),
        formattedTotal: moneyFormat(_order.total),
        shipment: {
          ..._order.shipment,
          formattedScheduledAt: _order.shipment.scheduled_at
            ? format(parseISO(_order.shipment.scheduled_at), 'HH:mm')
            : null,
        },
        order_status: _order.order_status.reverse().map(status => {
          const statusDate = parseISO(status.created_at);
          status.formattedDate = format(statusDate, "PP 'às' p", { locale: ptBR });
          status.statusName = orderStatusName(_order.shipment.shipment_method, status.status);
          return status;
        }),
      });
    } catch (err) {
      setError(true);
    }
  }, []);
  return [order, loadOrder, error, setOrder];
}
