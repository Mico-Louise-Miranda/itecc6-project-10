const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PlantModel = require('./models/Plants');

// Load environment variables
dotenv.config();

// Helper function to calculate next watering date based on frequency
const calculateNextWatering = (lastWatered, frequencyInDays) => {
  const nextDate = new Date(lastWatered);
  nextDate.setDate(nextDate.getDate() + frequencyInDays);
  return nextDate;
};

// Helper function to convert waterneeds string to frequency in days
const getWateringFrequency = (waterneeds) => {
  switch(waterneeds) {
    case 'Every 3 days':
      return 3;
    case 'Twice weekly': 
      return 4;
    case 'Weekly':
      return 7;
    case 'Keep soil moist':
      return 3;
    case 'Every 2-3 weeks':
      return 17;
    case 'When top soil is dry':
      return 5;
    default:
      return 7; // Default to weekly watering
  }
};

// Main migration function
const migratePlants = async () => {
  try {
    // Connect to MongoDB Atlas using environment variable
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas successfully");
    
    // Get all plants without watering history
    const plants = await PlantModel.find({});
    console.log(`Found ${plants.length} plants to migrate`);
    
    // Update each plant
    for (const plant of plants) {
      // Only update if it doesn't have watering history yet
      if (!plant.wateringHistory || plant.wateringHistory.length === 0) {
        console.log(`Migrating plant: ${plant.name}`);
        
        const now = new Date();
        const frequency = getWateringFrequency(plant.waterneeds);
        
        // Update plant with watering information
        plant.wateringFrequency = frequency;
        plant.lastWatered = now;
        plant.nextWatering = calculateNextWatering(now, frequency);
        plant.wateringHistory = [{ date: now }];
        
        await plant.save();
        console.log(`Updated plant: ${plant.name}`);
      } else {
        console.log(`Plant ${plant.name} already has watering history, skipping`);
      }
    }
    
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
};

// Run the migration
migratePlants(); 