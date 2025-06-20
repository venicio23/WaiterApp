import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategoy } from './app/useCases/categories/createCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProducts';
import { listProductsByCategory } from './app/useCases/products/listProdutsByCategory';

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

// LIST PRODUCT
router.get('/products', listProducts);

// CREATE PRODUCT
router.post('/products', upload.single('image'), createProduct);

// LIST PRODUTCS BY CATEGORY
router.get('/categories/:categoryId/products', listProductsByCategory);

// LIST ORDERS
router.get('/orders', (req, res) => {
  res.send('Ok');
});

// CREATE ORDER
router.post('/orders', (req, res) => {
  res.send('Ok');
});

// CHANGE ORDER STATUS
router.patch('/orders/:orderId', (req, res) => {
  res.send('Ok');
});

// DELETE ORDER
router.delete('/orders/:orderId', (req, res) => {
  res.send('Ok');
});
