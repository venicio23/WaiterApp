import { Request, Response } from 'express';

import { Category } from '../../models/Category';
import { validateRequiredFields } from '../../../utils/validateRequiredFields';

export async function createCategoy(req: Request, res: Response) {
  try {
    const {name, icon} = req.body;
    const missingFields = validateRequiredFields({ name, icon });

    if (missingFields.length > 0) {
      res.status(400).json({
        error: `Os seguintes campos são obrigatórios: ${missingFields.join(', ')}`
      });
      return;
    }

    const category = await Category.create({name: name, icon: icon});

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
