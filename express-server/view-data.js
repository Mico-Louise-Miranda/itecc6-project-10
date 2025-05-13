const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PlantModel = require('./models/Plants');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    viewAllPlants();
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB Atlas:", err.message);
    process.exit(1);
  });

// Function to fetch and display all plants
async function viewAllPlants() {
  try {
    const plants = await PlantModel.find({});
    console.log("\n==== ALL PLANTS IN DATABASE ====\n");
    
    if (plants.length === 0) {
      console.log("No plants found in the database.");
    } else {
      plants.forEach((plant, index) => {
        console.log(`\n--- Plant ${index + 1} ---`);
        console.log(`ID: ${plant._id}`);
        console.log(`Name: ${plant.name}`);
        console.log(`Description: ${plant.desc}`);
        console.log(`Sun Requirements: ${plant.sunreq}`);
        console.log(`Water Needs: ${plant.waterneeds}`);
        console.log(`Soil Type: ${plant.soiltype}`);
        console.log(`Image URL: ${plant.image}`);
        console.log(`Last Watered: ${plant.lastWatered ? plant.lastWatered.toDateString() : 'Never'}`);
        console.log(`Next Watering: ${plant.nextWatering ? plant.nextWatering.toDateString() : 'Not scheduled'}`);
        console.log(`Watering Frequency: Every ${plant.wateringFrequency} days`);
        
        if (plant.wateringHistory && plant.wateringHistory.length > 0) {
          console.log(`Watering History: ${plant.wateringHistory.length} entries`);
          plant.wateringHistory.slice(0, 3).forEach((entry, i) => {
            console.log(`  - ${entry.date.toDateString()}`);
          });
          if (plant.wateringHistory.length > 3) {
            console.log(`  ... and ${plant.wateringHistory.length - 3} more entries`);
          }
        } else {
          console.log("Watering History: None");
        }
      });
      console.log(`\nTotal plants: ${plants.length}`);
    }
  } catch (error) {
    console.error("Error fetching plants:", error);
  } finally {
    mongoose.connection.close();
    console.log("\nDatabase connection closed");
  }
} 