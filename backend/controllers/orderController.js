import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order || (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')) {
      return res.status(404).json({
        status: 'fail',
        message: 'No order found with that ID or you do not have permission',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, 
      { status: req.body.status, paymentStatus: req.body.paymentStatus }, 
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product items.pet')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
