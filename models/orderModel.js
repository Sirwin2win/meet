import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    reference: { type: String },
    products: [
      {
        name: { type: String },
        price: { type: String },
        email: { type: String },
      },
    ],
    total: { type: Number, required: true },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);


const orderModel = mongoose.models.order || mongoose.model("order", orderSchema )
export default orderModel




