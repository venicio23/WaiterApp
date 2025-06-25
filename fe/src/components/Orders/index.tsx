import type { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
    id: "1",
    table: "2",
    status: "WAITING",
    products: [
      {
        _id: "1",
        quantity: 2,
        product: {
          id: "1",
          name: "Pizza de Calabresa",
          imagePath: "/uploads/pizza-calabresa.jpg",
          price: 30.0,
        },
      },
    ],
  },
  {
    id: "2",
    table: "3",
    status: "IN_PRODUCTION",
    products: [
      {
        _id: "2",
        quantity: 1,
        product: {
          id: "2",
          name: "Pizza de Frango com Catupiry",
          imagePath: "/uploads/pizza-frango-catupiry.jpg",
          price: 35.0,
        },
      },
    ],
  },
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="⏳" title="Fila de espera" orders={orders.filter(order => order.status === 'WAITING')} />
      <OrdersBoard icon="🧑‍🍳" title="Em preparação" orders={orders.filter(order => order.status === 'IN_PRODUCTION')} />
      <OrdersBoard icon="✅" title="Pronto" orders={orders.filter(order => order.status === 'DONE')} />
    </Container>
  );
}
