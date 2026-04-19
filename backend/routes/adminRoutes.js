import express from 'express';
import * as adminController from '../controllers/adminController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Protect all admin routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/stats', adminController.getDashboardStats);
router.get('/users', adminController.getAllUsers);

export default router;
