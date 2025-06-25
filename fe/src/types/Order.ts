export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  createdAt: string;
  __v: number;
  products: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      imagePath: string;
      description: string;
      price: number;
      ingredients: {
        _id: string;
        name: string;
        icon: string;
      }[];
      category: string;
      __v: number;
    }
  }[]
}
