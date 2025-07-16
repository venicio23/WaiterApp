import { useEffect, useState } from "react";
import socketIo from "socket.io-client";

import type { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";
import {api} from '../../../utils/api';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo(api.defaults.baseURL, {
      transports: ['websocket'],
    });

    socket.on('newOrder', (order) => {
      setOrders(prevState => {
        if (prevState.some(o => o._id === order._id)) {
          return prevState;
        }
        return prevState.concat(order);
      });
    });
  }, []);

  useEffect(() => {
    api.get('/orders').then(({data}) => {
      setOrders(data);
    });
  }, []);

  function handleCancelOrder(orderId: string) {
    setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
  }

  async function handleUpdateOrder(orderId: string, status: Order['status']) {
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        return { ...order, status };
      }
      return order;
    });
    setOrders(updatedOrders);
  }

  return (
    <Container>
      <OrdersBoard
        icon="⏳"
        title="Fila de espera"
        orders={orders.filter((order) => order.status === "WAITING")}
        onCancelOrder={handleCancelOrder}
        onUpdateOrderStatus={handleUpdateOrder}
      />
      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={orders.filter((order) => order.status === "IN_PRODUCTION")}
        onCancelOrder={handleCancelOrder}
        onUpdateOrderStatus={handleUpdateOrder}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={orders.filter((order) => order.status === "DONE")}
        onCancelOrder={handleCancelOrder}
        onUpdateOrderStatus={handleUpdateOrder}
      />
    </Container>
  );
}
