import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategoy(req: Request, res: Response) {
  try {
    const {name, icon} = req.body;

    const category = await Category.create({name: name, icon: icon});

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
