import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategoy } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProducts';
import { listProductsByCategory } from './app/useCases/products/listProdutsByCategory';
import { listOrder } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { cancelCategory } from './app/useCases/categories/cancelCategory';
import { cancelProduct } from './app/useCases/products/cancelProduct';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      const fileName = `${Date.now()}.png`;
      callback(null, fileName);
    },
  }),
});

// LIST CATEGORY
router.get('/categories', listCategories);

// CREATE CATEGORY
router.post('/categories', createCategoy);

// CANCEL CATEGORY
router.delete('/categories/:categoryId', cancelCategory);

// LIST PRODUCT
router.get('/products', listProducts);

// CREATE PRODUCT
router.post('/products', upload.single('image'), createProduct);

// LIST PRODUTCS BY CATEGORY
router.get('/categories/:categoryId/products', listProductsByCategory);

// CANCEL PRODUCT
router.delete('/products/:productId', cancelProduct);

// LIST ORDERS
router.get('/orders', listOrder);

// CREATE ORDER
router.post('/orders', createOrder);

// CHANGE ORDER STATUS
router.patch('/orders/:orderId', changeOrderStatus);

// CANCEL ORDER
router.delete('/orders/:orderId', cancelOrder);
