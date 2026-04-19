import express from 'express';
import * as orderController from '../controllers/orderController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .post(orderController.createOrder)
  .get((req, res, next) => {
    if (req.user.role === 'admin') {
      return orderController.getAllOrders(req, res, next);
    }
    return orderController.getMyOrders(req, res, next);
  });

router
  .route('/:id')
  .get(orderController.getOrder)
  .patch(authController.restrictTo('admin'), orderController.updateOrderStatus)
  .delete(authController.restrictTo('admin'), orderController.deleteOrder);

export default router;
