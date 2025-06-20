import { model, Schema } from 'mongoose';

export const Order = model("Order",
  new Schema({
    table: { String, required: true },
    status: {
      type: String,
      enum: ["WAITING", "IN_PRODUCTION", "DONE"],
      default: "WAITING",
      required: true,
    },
    createdAt: { type: Date, required: true, default: Date.now },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          quantity: { type: Number, required: true, default: 1 },
        },
      ],
    },
  })
);

