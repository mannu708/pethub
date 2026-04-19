import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/orderModel.js';

// Helper to get fresh Razorpay instance
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

export const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Amount is required'
      });
    }

    const razorpay = getRazorpayInstance();

    const options = {
      amount: Math.round(amount * 100), // Ensure integer (paise)
      currency,
      receipt: String(receipt),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      status: 'success',
      data: {
        order,
        keyId: process.env.RAZORPAY_KEY_ID
      },
    });
  } catch (err) {
    console.error("RAZORPAY ERROR:", err);
    res.status(500).json({
      status: 'fail',
      message: err.description || err.message || "Failed to create Razorpay order",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId, // This is our database order ID
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          paymentStatus: 'paid',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'processing'
        },
        { new: true }
      );

      return res.status(200).json({
        status: 'success',
        message: "Payment verified successfully",
        data: {
          order: updatedOrder
        }
      });
    } else {
      return res.status(400).json({
        status: 'fail',
        message: "Invalid signature sent!",
      });
    }
  } catch (err) {
    console.error("VERIFICATION ERROR:", err);
    res.status(500).json({
      status: 'error',
      message: err.message || "Internal Server Error during verification!",
    });
  }
};
