// Test coordinate access fix
console.log("Testing clinic coordinate access...");

// Sample clinic data from your API (matching the exact structure)
const clinicData = [
    {
        "_id": "68ac0fe42dce02672e04afbd",
        "clinicId": "ambher-optical-main",
        "clinicName": "SADWAD",
        "clinicType": "Ambher Optical",
        "coordinates": {
            "type": "Point",
            "coordinates": [120.52332307946568, 14.675098707399599]
        },
        "address": {
            "fullAddress": "wqeqwe"
        }
    },
    {
        "_id": "68ac2f092dce02672e04b004",
        "clinicId": "bautista-eye-center-main",
        "clinicName": "Gabriel CXlinic",
        "clinicType": "Bautista Eye Center",
        "coordinates": {
            "type": "Point",
            "coordinates": [120.53557151131383, 14.677055352879748]
        },
        "address": {
            "fullAddress": "21321"
        }
    }
];

console.log("Processing clinics with corrected coordinate access:");

clinicData.forEach((clinic, index) => {
    console.log(`\nProcessing clinic ${index + 1}:`, clinic.clinicName);
    console.log('Raw coordinates:', clinic.coordinates);
    
    // Handle GeoJSON format from database: coordinates.coordinates = [longitude, latitude]
    let longitude, latitude;
    
    if (clinic.coordinates?.coordinates && Array.isArray(clinic.coordinates.coordinates)) {
        // GeoJSON format from database
        longitude = clinic.coordinates.coordinates[0];
        latitude = clinic.coordinates.coordinates[1];
        console.log(`✅ Using GeoJSON coordinates: [${longitude}, ${latitude}]`);
    } else if (clinic.coordinates?.longitude && clinic.coordinates?.latitude) {
        // Object format
        longitude = clinic.coordinates.longitude;
        latitude = clinic.coordinates.latitude;
        console.log(`✅ Using object coordinates: [${longitude}, ${latitude}]`);
    } else {
        console.log(`❌ Invalid coordinates found`);
    }
    
    if (longitude && latitude && !isNaN(longitude) && !isNaN(latitude)) {
        console.log(`✅ Coordinates are valid for ${clinic.clinicName}: [${longitude}, ${latitude}]`);
        console.log(`   This clinic marker SHOULD appear on the map`);
    } else {
        console.log(`❌ Invalid coordinates for ${clinic.clinicName}`);
        console.log(`   This clinic marker WILL NOT appear on the map`);
    }
});

console.log("\nSummary: Both clinics should now appear on the map with the coordinate fix!");
