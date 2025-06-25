import type { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
    {
        "_id": "685c0d94d93c49debff75605",
        "table": "10",
        "status": "WAITING",
        "products": [
            {
                "product": {
                    "_id": "6856b4425ac2afe35e30560d",
                    "name": "Chopp do Mestre",
                    "description": "Refrescante, encorpado e com a cremosidade na medida certa. O Chopp do Mestre é servido na temperatura ideal para realçar suas notas maltadas e o leve amargor do lúpulo, garantindo uma experiência suave e marcante. Ideal para acompanhar qualquer ocasião – do brinde com os amigos ao fim de um dia cheio.",
                    "imagePath": "1750512706959.png",
                    "price": 12,
                    "ingredients": [
                        {
                            "name": "Cevada Malteada",
                            "icon": "🌾",
                            "_id": "6856b4425ac2afe35e30560e"
                        }
                    ],
                    "category": "6856b2fe5ac2afe35e305601",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "685c0d94d93c49debff75606"
            },
            {
                "product": {
                    "_id": "6856b5575ac2afe35e30561a",
                    "name": "Coca-Cola Gelada",
                    "description": "Refrescância pura e sabor inconfundível da Coca-Cola, servida geladinha para acompanhar perfeitamente seu lanche ou combo favorito. A bebida que nunca sai de moda!",
                    "imagePath": "1750512983325.png",
                    "price": 8,
                    "ingredients": [
                        {
                            "name": "Coca Cola",
                            "icon": "🥤",
                            "_id": "6856b5575ac2afe35e30561b"
                        }
                    ],
                    "category": "6856b2fe5ac2afe35e305601",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "685c0d94d93c49debff75607"
            }
        ],
        "createdAt": "2025-06-25T14:54:12.105Z",
        "__v": 0
    },
    {
        "_id": "685c0da1d93c49debff75609",
        "table": "10",
        "status": "IN_PRODUCTION",
        "products": [
            {
                "product": {
                    "_id": "6856b4425ac2afe35e30560d",
                    "name": "Chopp do Mestre",
                    "description": "Refrescante, encorpado e com a cremosidade na medida certa. O Chopp do Mestre é servido na temperatura ideal para realçar suas notas maltadas e o leve amargor do lúpulo, garantindo uma experiência suave e marcante. Ideal para acompanhar qualquer ocasião – do brinde com os amigos ao fim de um dia cheio.",
                    "imagePath": "1750512706959.png",
                    "price": 12,
                    "ingredients": [
                        {
                            "name": "Cevada Malteada",
                            "icon": "🌾",
                            "_id": "6856b4425ac2afe35e30560e"
                        }
                    ],
                    "category": "6856b2fe5ac2afe35e305601",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "685c0da1d93c49debff7560a"
            }
        ],
        "createdAt": "2025-06-25T14:54:25.679Z",
        "__v": 0
    }
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="⏳" title="Fila de espera" orders={orders.filter(order => order.status === 'WAITING')} />
      <OrdersBoard icon="🧑‍🍳" title="Em preparação" orders={orders.filter(order => order.status === 'IN_PRODUCTION')} />
      <OrdersBoard icon="✅" title="Pronto" orders={orders.filter(order => order.status === 'DONE')} />
    </Container>
  );
}
