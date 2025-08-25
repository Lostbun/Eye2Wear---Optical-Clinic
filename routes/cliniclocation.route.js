import express from 'express';
import {
  getAllClinicLocations,
  getClinicLocationById,
  getCurrentUserClinicLocation,
  upsertClinicLocation,
  findNearbyClinic,
  geocodeAddress,
  deleteClinicLocation
} from '../controllers/cliniclocation.controller.js';

const router = express.Router();

// Public routes
router.get('/clinics', getAllClinicLocations);
router.get('/clinics/:clinicId', getClinicLocationById);
router.get('/nearby', findNearbyClinic);
router.get('/geocode', geocodeAddress);

// Protected routes (add your auth middleware when ready)
router.get('/current', getCurrentUserClinicLocation);
router.post('/clinics', upsertClinicLocation);
router.put('/clinics/:clinicId', upsertClinicLocation);
router.delete('/clinics/:clinicId', deleteClinicLocation);

export default router;