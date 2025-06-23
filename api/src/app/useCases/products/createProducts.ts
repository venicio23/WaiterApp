import { Request, Response } from 'express';

import { Products } from '../../models/Products';
import { validateRequiredFields } from '../../../utils/validateRequiredFields';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    const missingFields = validateRequiredFields({ name, description, price, category, ingredients, imagePath });

    if (missingFields.length > 0) {
      res.status(400).json({
        error: `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`
      });
      return;
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      res.status(400).json({ error: 'O preço deve ser um número válido e positivo.' });
      return;
    }

    const product = await Products.create({
      name,
      description,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
