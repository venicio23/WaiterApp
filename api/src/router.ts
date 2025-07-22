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

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Gerenciamento de categorias de produtos
 *   - name: Products
 *     description: Gerenciamento de produtos do cardápio
 *   - name: Orders
 *     description: Sistema de pedidos do restaurante
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     description: Retorna uma lista com todas as categorias cadastradas no sistema
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *             example:
 *               - _id: "507f1f77bcf86cd799439011"
 *                 name: "Pizzas"
 *                 icon: "🍕"
 *               - _id: "507f1f77bcf86cd799439012"
 *                 name: "Bebidas"
 *                 icon: "🥤"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/categories', listCategories);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     description: Cadastra uma nova categoria no sistema
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *           example:
 *             name: "Sobremesas"
 *             icon: "🍰"
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               _id: "507f1f77bcf86cd799439013"
 *               name: "Sobremesas"
 *               icon: "🍰"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/categories', createCategoy);

/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     summary: Remove uma categoria
 *     description: Remove uma categoria do sistema. Atenção - isso pode afetar produtos associados
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID da categoria a ser removida (ObjectId do MongoDB)
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       204:
 *         description: Categoria removida com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/categories/:categoryId', cancelCategory);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     description: Retorna uma lista com todos os produtos cadastrados, incluindo informações da categoria
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               - _id: "507f1f77bcf86cd799439013"
 *                 name: "Pizza Margherita"
 *                 description: "Pizza clássica com molho de tomate, mussarela e manjericão"
 *                 price: 4000
 *                 imagePath: "1640995200000.png"
 *                 category:
 *                   _id: "507f1f77bcf86cd799439011"
 *                   name: "Pizzas"
 *                   icon: "🍕"
 *                 ingredients:
 *                   - name: "Mussarela"
 *                     icon: "🧀"
 *                   - name: "Manjericão"
 *                     icon: "🌿"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/products', listProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     description: Cadastra um novo produto com upload de imagem
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *                 example: "Pizza Margherita"
 *               description:
 *                 type: string
 *                 description: Descrição detalhada do produto
 *                 example: "Pizza clássica com molho de tomate artesanal, mussarela fresca e manjericão"
 *               price:
 *                 type: number
 *                 description: Preço em centavos (4000 = R$ 40,00)
 *                 example: 4000
 *               category:
 *                 type: string
 *                 description: ID da categoria
 *                 example: "507f1f77bcf86cd799439011"
 *               ingredients:
 *                 type: string
 *                 description: JSON string com array de ingredientes
 *                 example: '[{"name": "Mussarela", "icon": "🧀"}, {"name": "Manjericão", "icon": "🌿"}]'
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem do produto (PNG, JPG, JPEG)
 *           encoding:
 *             image:
 *               contentType: image/png, image/jpeg, image/jpg
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/products', upload.single('image'), createProduct);

/**
 * @swagger
 * /categories/{categoryId}/products:
 *   get:
 *     summary: Lista produtos de uma categoria específica
 *     description: Retorna todos os produtos que pertencem a uma categoria específica
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID da categoria
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               - _id: "507f1f77bcf86cd799439013"
 *                 name: "Pizza Margherita"
 *                 description: "Pizza clássica com molho de tomate, mussarela e manjericão"
 *                 price: 4000
 *                 imagePath: "1640995200000.png"
 *                 category: "507f1f77bcf86cd799439011"
 *                 ingredients:
 *                   - name: "Mussarela"
 *                     icon: "🧀"
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/categories/:categoryId/products', listProductsByCategory);

/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Remove um produto
 *     description: Remove um produto do sistema
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID do produto a ser removido
 *         example: "507f1f77bcf86cd799439013"
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/products/:productId', cancelProduct);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lista todos os pedidos
 *     description: Retorna todos os pedidos do sistema, ordenados por data de criação (mais recentes primeiro)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *             example:
 *               - _id: "507f1f77bcf86cd799439015"
 *                 table: "1"
 *                 status: "WAITING"
 *                 products:
 *                   - product:
 *                       _id: "507f1f77bcf86cd799439013"
 *                       name: "Pizza Margherita"
 *                       price: 4000
 *                     quantity: 2
 *                 createdAt: "2023-01-01T12:00:00.000Z"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/orders', listOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Cria um novo pedido
 *     description: Registra um novo pedido no sistema
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderInput'
 *           example:
 *             table: "5"
 *             products:
 *               - product: "507f1f77bcf86cd799439013"
 *                 quantity: 2
 *               - product: "507f1f77bcf86cd799439014"
 *                 quantity: 1
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *             example:
 *               _id: "507f1f77bcf86cd799439015"
 *               table: "5"
 *               status: "WAITING"
 *               products:
 *                 - product: "507f1f77bcf86cd799439013"
 *                   quantity: 2
 *                 - product: "507f1f77bcf86cd799439014"
 *                   quantity: 1
 *               createdAt: "2023-01-01T12:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/orders', createOrder);

/**
 * @swagger
 * /orders/{orderId}:
 *   patch:
 *     summary: Atualiza o status de um pedido
 *     description: |
 *       Atualiza o status de um pedido específico. Os status possíveis são:
 *       - **WAITING**: Pedido aguardando preparo
 *       - **IN_PRODUCTION**: Pedido em preparo
 *       - **DONE**: Pedido finalizado
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID do pedido
 *         example: "507f1f77bcf86cd799439015"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderStatusUpdate'
 *           example:
 *             status: "IN_PRODUCTION"
 *     responses:
 *       200:
 *         description: Status do pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *             example:
 *               _id: "507f1f77bcf86cd799439015"
 *               table: "5"
 *               status: "IN_PRODUCTION"
 *               products:
 *                 - product: "507f1f77bcf86cd799439013"
 *                   quantity: 2
 *               createdAt: "2023-01-01T12:00:00.000Z"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch('/orders/:orderId', changeOrderStatus);

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Cancela um pedido
 *     description: Remove um pedido do sistema
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID do pedido a ser cancelado
 *         example: "507f1f77bcf86cd799439015"
 *     responses:
 *       204:
 *         description: Pedido cancelado com sucesso
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/orders/:orderId', cancelOrder);
