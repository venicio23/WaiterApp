export interface Order {
  id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: {
    _id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      imagePath: string;
      price: number;
    }
  }[]
}
