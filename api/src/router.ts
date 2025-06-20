import { Router } from 'express';
import { listCategories } from './app/useCases/categories/listCategories';
import { createCategoy } from './app/useCases/categories/createCategory';

export const router = Router();

// LIST CATEGORY
router.get('/categories', listCategories);

// CREATE CATEGORY
router.post('/categories', createCategoy);

// LIST PRODUCT
router.get('/produtcs', (req, res) => {
  res.send('Ok');
});

// CREATE PRODUCT
router.post('/produtcs', (req, res) => {
  res.send('Ok');
});

// GET PRODUTCS BY CATEGORY
router.get('/categories/:categoryId/products', (req, res) => {
  res.send('Ok');
});

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
