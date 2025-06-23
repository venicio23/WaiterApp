import { Request, Response } from "express";

import { Category } from "../../models/Category";

export async function cancelCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    await Category.findByIdAndDelete(categoryId);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error canceling category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

