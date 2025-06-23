import { Request, Response } from "express";

import { Order } from "../../models/Order";
import { validateRequiredFields } from "../../../utils/validateRequiredFields";

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const missingFields = validateRequiredFields({ orderId, status });

    if (missingFields.length > 0) {
      res.status(400).json({error: `Os seguintes campos são obrigatórios: ${missingFields.join(", ")}`});
      return;
    }

    if(!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
      res.status(400).json({ error: "Invalid status. Use 'WAITING', 'IN_PRODUCTION' or 'DONE'." });
      return;
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error changing order status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

