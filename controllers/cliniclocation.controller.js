import ClinicLocation from '../models/cliniclocation.js';
import fetch from 'node-fetch';
import mongoose from 'mongoose';


// Get all clinic locations
export const getAllClinicLocations = async (req, res) => {
  try {
    const locations = await ClinicLocation.find({ isActive: true });
    res.status(200).json({
      success: true,
      data: locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clinic locations',
      error: error.message
    });
  }
};

// Get clinic location by clinic ID
export const getClinicLocationById = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const location = await ClinicLocation.findOne({ clinicId, isActive: true });
    
    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Clinic location not found'
      });
    }

    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clinic location',
      error: error.message
    });
  }
};

// Get current user's clinic location
export const getCurrentUserClinicLocation = async (req, res) => {
  try {
    // Extract user info from request (you'll need to add auth middleware)
    const userId = req.user?.id;
    const userRole = req.user?.role;
    const userClinic = req.user?.clinic;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    let clinicType = userClinic;
    
    // If clinic type is not available, determine from role
    if (!clinicType) {
      if (userRole === 'staff' || userRole === 'owner') {
        // You might need to query the user's clinic from their profile
        clinicType = 'Ambher Optical'; // Default, should be dynamic
      }
    }

    const location = await ClinicLocation.findOne({ 
      clinicType,
      isActive: true 
    });

    res.status(200).json({
      success: true,
      data: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching clinic location',
      error: error.message
    });
  }
};

// Create or update clinic location
export const upsertClinicLocation = async (req, res) => {
  try {
    const {
      clinicId,
      clinicName,
      clinicType,
      address,
      longitude,
      latitude,
      contactInfo,
      operatingHours,
      services
    } = req.body;

    // For now, we'll use a default user ID. You should implement proper auth
    const userId = req.user?.id || new mongoose.Types.ObjectId();

    const locationData = {
      clinicId: clinicId || `${clinicType.toLowerCase().replace(/\s+/g, '-')}-main`,
      clinicName,
      clinicType,
      address,
      coordinates: {
        type: 'Point',
        coordinates: [longitude, latitude] // [lng, lat] format for GeoJSON
      },
      contactInfo: contactInfo || {},
      operatingHours: operatingHours || {},
      services: services || [],
      updatedBy: userId
    };

    const location = await ClinicLocation.findOneAndUpdate(
      { clinicId: locationData.clinicId },
      locationData,
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    // If creating new, set createdBy
    if (!location.createdBy) {
      location.createdBy = userId;
      await location.save();
    }

    res.status(200).json({
      success: true,
      message: 'Clinic location saved successfully',
      data: location
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving clinic location',
      error: error.message
    });
  }
};

// Find nearby clinics
export const findNearbyClinic = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters

    const nearbyClinic = await ClinicLocation.find({
      isActive: true,
      coordinates: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.status(200).json({
      success: true,
      data: nearbyClinic
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error finding nearby clinics',
      error: error.message
    });
  }
};

// Geocode address using Mapbox
export const geocodeAddress = async (req, res) => {
  try {
    const { address } = req.query;
    
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1&country=ph`
    );

    const data = await response.json();

    if (data.features.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    const feature = data.features[0];
    res.status(200).json({
      success: true,
      data: {
        coordinates: {
          longitude: feature.center[0],
          latitude: feature.center[1]
        },
        address: feature.place_name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error geocoding address',
      error: error.message
    });
  }
};

// Delete clinic location
export const deleteClinicLocation = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const userId = req.user?.id;
    
    const result = await ClinicLocation.findOneAndUpdate(
      { clinicId },
      { isActive: false, updatedBy: userId }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Clinic location not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Clinic location deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting clinic location',
      error: error.message
    });
  }
};