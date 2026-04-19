import express from 'express';
import * as petController from '../controllers/petController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router
  .route('/')
  .get(petController.getAllPets)
  .post(authController.protect, petController.createPet);

router.get(
  '/pending',
  authController.protect,
  authController.restrictTo('admin'),
  petController.getPendingPets
);

router.patch(
  '/:id/status',
  authController.protect,
  authController.restrictTo('admin'),
  petController.adminUpdatePetStatus
);

router
  .route('/:id')
  .get(petController.getPet)
  .patch(authController.protect, petController.updatePet)
  .delete(authController.protect, authController.restrictTo('admin'), petController.deletePet);

export default router;
