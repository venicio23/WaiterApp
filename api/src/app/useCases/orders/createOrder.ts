import { Request, Response } from "express";

import { Order } from "../../models/Order";
import { validateRequiredFields } from "../../../utils/validateRequiredFields";

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const missingFields = validateRequiredFields({ table, products });

    if (missingFields.length > 0) {
      res.status(400).json({error: `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`});
      return;
    }

    const order = await Order.create({ table, products });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
