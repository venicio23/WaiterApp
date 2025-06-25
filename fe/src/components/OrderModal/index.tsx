import { Overlay, ModalBody, OrderDetails } from './styles';

import CloseIcon from '../../assets/images/close-icon.svg'
import type { Order } from '../../types/Order';

interface OrderModalProps {
  isVisible: boolean;
  order: Order | null;
}

export function OrderModal({ isVisible, order }: OrderModalProps) {
  if (!isVisible || !order) return null;

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button">
            <img src={CloseIcon} alt="Fechar Modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '⏳'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de Espera'}
              {order.status === 'IN_PRODUCTION' && 'Em Produção'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>
          {order.products.map(({ _id, product, quantity }) => (
            <div className="item" key={_id}>
              <img src={`http://localhost:3000/uploads/${product.imagePath}`} alt={product.name} />
            </div>
          ))}
        </OrderDetails>
      </ModalBody>
    </Overlay>
  );
}
