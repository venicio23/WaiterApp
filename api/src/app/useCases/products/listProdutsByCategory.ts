import { Request, Response } from 'express';

import { Products } from '../../models/Products';

export async function listProductsByCategory(req: Request, res: Response) {
  const { categoryId } = req.params;
  const products = await Products.find({ category: categoryId });

  res.json(products);
}
