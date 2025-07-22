import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

import CloseIcon from '../../assets/images/close-icon.svg'
import type { Order } from '../../types/Order';
import { useEffect } from 'react';
import { api } from '../../utils/api';

interface OrderModalProps {
  isVisible: boolean;
  order: Order | null;
  onClose?: () => void;
  onCancelOrder?: () => void;
  onUpdateOrderStatus?: (status: Order['status']) => void;
  isLoading?: boolean;
}

export function OrderModal({
  isVisible,
  order,
  onClose,
  onCancelOrder,
  onUpdateOrderStatus,
  isLoading,
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isVisible) {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible || !order) return null;

  const price = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onClose}>
            <img src={CloseIcon} alt="Fechar Modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === "WAITING" && "⏳"}
              {order.status === "IN_PRODUCTION" && "👨‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>
            <strong>
              {order.status === "WAITING" && "Fila de Espera"}
              {order.status === "IN_PRODUCTION" && "Em Produção"}
              {order.status === "DONE" && "Pronto"}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`${api.defaults.baseURL}/uploads/${product.imagePath}`}
                  alt={product.name}
                  width={48}
                  height={40}
                />

                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{price.format(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{price.format(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          { order.status === "DONE" ? (
            <button
              disabled={isLoading}
              onClick={onCancelOrder}
              type="button"
              className="secondary"
            >
              <strong>Arquivar Pedido</strong>
            </button>
          ) : (
            <button
              onClick={onCancelOrder}
              disabled={isLoading}
              type="button"
              className="secondary"
            >
              <strong>Cancelar Pedido</strong>
            </button>
          )}

          {order.status !== "DONE" && (
            <button
              onClick={() => onUpdateOrderStatus?.(order?.status)}
              disabled={isLoading}
              type="button"
              className="primary"
            >
              <strong>
                {order.status === "WAITING"
                  ? "Iniciar Produção"
                  : "Finalizar Pedido"}
              </strong>
            </button>
          )}
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
