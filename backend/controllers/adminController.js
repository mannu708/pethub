import Pet from '../models/petModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [petStats, productCount, orderStats, userCount] = await Promise.all([
      Pet.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            pending: {
              $sum: { $cond: [{ $eq: ["$approvalStatus", "pending"] }, 1, 0] }
            }
          }
        }
      ]),
      Product.countDocuments(),
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$totalAmount" }
          }
        }
      ]),
      User.countDocuments()
    ]);

    const stats = {
      totalPets: petStats[0]?.total || 0,
      pendingPets: petStats[0]?.pending || 0,
      totalProducts: productCount || 0,
      totalOrders: orderStats[0]?.totalOrders || 0,
      totalRevenue: orderStats[0]?.totalRevenue || 0,
      totalUsers: userCount || 0
    };

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};
