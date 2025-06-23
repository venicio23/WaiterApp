import { Request, Response } from "express";

import { Products } from "../../models/Products";

export async function cancelProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    await Products.findByIdAndDelete(productId);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error canceling product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

