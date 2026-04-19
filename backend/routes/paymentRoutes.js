import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// All payment routes are protected
router.use(authController.protect);

router.post('/create-order', paymentController.createOrder);
router.post('/verify', paymentController.verifyPayment);

export default router;
