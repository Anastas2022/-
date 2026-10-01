import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ['card', 'paypal'], required: true },
  },
  items: [
    {
      id: Number,
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = model('Order', OrderSchema);
