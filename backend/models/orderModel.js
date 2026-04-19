import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An order must belong to a user'],
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
      pet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Pet',
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'failed'],
    default: 'unpaid',
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  shippingAddress: {
    type: String,
    default: 'Address with-held (Demo)',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
