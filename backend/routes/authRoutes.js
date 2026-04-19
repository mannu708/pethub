import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.use(authController.protect);
router.get('/me', authController.getMe);

export default router;
