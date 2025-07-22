import { useState } from 'react';
import type { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import {Board, OrdersContainer} from './styles';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onUpdateOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrder(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 300));
    await api.delete(`/orders/${selectedOrder._id}`);

    onCancelOrder(selectedOrder._id);
    setIsLoading(false);
    toast.success('Pedido cancelado com sucesso!');
    handleCloseModal();
  }

  async function handleUpdateOrderStatus(status: Order['status']) {
    if (!selectedOrder) return;
    setIsLoading(true);

    const newStatus = status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder._id}`, { status: newStatus });

    onUpdateOrderStatus(selectedOrder._id, newStatus);
    setIsLoading(false);
    toast.success('Status do pedido atualizado com sucesso!');
    handleCloseModal();
  }

  return (
    <Board>
      <OrderModal
        isVisible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        isLoading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      <OrdersContainer>
        {orders.map(order => (
          <button type="button" key={order._id} onClick={() => handleOpenOrder(order)}>
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        ))}
      </OrdersContainer>
    </Board>
  );
}


