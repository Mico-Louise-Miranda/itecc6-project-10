const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const PlantModel = require('./models/Plants')

// Load environment variables
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// In-memory storage (fallback)
let plants = [];
let nextId = 1;
let useMongoDb = true; // Set to false to use in-memory storage

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

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    useMongoDb = true;
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB Atlas:", err.message);
    console.log("Falling back to in-memory storage");
    useMongoDb = false;
  });

app.get('/', (req, res) => {
    if (useMongoDb) {
      PlantModel.find({})
        .then(plants => res.json(plants))
        .catch(err => {
          console.error("Error fetching plants:", err);
          res.status(500).json({ error: err.message });
        });
    } else {
      // Fallback to in-memory storage
      res.json(plants);
    }
});

// Handle image upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Return the file path that can be accessed from the client
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imagePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/addPlant", (req, res) => {
    console.log("Received request body:", req.body);

    // Calculate watering frequency and next watering date
    const frequency = getWateringFrequency(req.body.waterneeds);
    const now = new Date();
    const nextWatering = calculateNextWatering(now, frequency);

    // Create plant object with updated fields
    const plantData = {
      ...req.body,
      wateringFrequency: frequency,
      lastWatered: now,
      nextWatering: nextWatering,
      wateringHistory: [{ date: now }]
    };

    if (useMongoDb) {
      PlantModel.create(plantData)
        .then(plant => {
          console.log("Saved to DB:", plant);
          res.json(plant);
        })
        .catch(err => {
          console.error("Error saving to DB:", err);
          res.status(500).json({ error: err.message });
        });
    } else {
      // Fallback to in-memory storage
      const plant = {
        _id: nextId++,
        ...plantData,
        createdAt: new Date()
      };
      plants.push(plant);
      console.log("Saved to memory:", plant);
      res.json(plant);
    }
});

app.get('/getPlant/:id', (req, res) => {
    if (useMongoDb) {
      PlantModel.findById(req.params.id)
        .then(plant => {
          if (!plant) return res.status(404).json({ error: 'Plant not found' });
          res.json(plant);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    } else {
      // Fallback to in-memory storage
      const id = parseInt(req.params.id);
      const plant = plants.find(p => p._id === id);
      if (!plant) return res.status(404).json({ error: 'Plant not found' });
      res.json(plant);
    }
});

app.put('/updatePlant/:id', (req, res) => {
    if (useMongoDb) {
      PlantModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(plant => {
          if (!plant) return res.status(404).json({ error: 'Plant not found' });
          res.json(plant);
        })
        .catch(err => res.status(500).json({ error: err.message }));
    } else {
      // Fallback to in-memory storage
      const id = parseInt(req.params.id);
      const index = plants.findIndex(p => p._id === id);
      if (index === -1) return res.status(404).json({ error: 'Plant not found' });
      
      plants[index] = {
        ...plants[index],
        ...req.body,
        _id: id // ensure ID doesn't change
      };
      
      res.json(plants[index]);
    }
});

app.delete('/deletePlant/:id', (req, res) => {
    if (useMongoDb) {
      PlantModel.findByIdAndDelete(req.params.id)
        .then(plant => {
          if (!plant) return res.status(404).json({ error: 'Plant not found' });
          res.json({ message: 'Plant deleted', plant });
        })
        .catch(err => res.status(500).json({ error: err.message }));
    } else {
      // Fallback to in-memory storage
      const id = parseInt(req.params.id);
      const index = plants.findIndex(p => p._id === id);
      if (index === -1) return res.status(404).json({ error: 'Plant not found' });
      
      const deletedPlant = plants[index];
      plants.splice(index, 1);
      res.json({ message: 'Plant deleted', plant: deletedPlant });
    }
});

// Water a plant
app.post('/waterPlant/:id', (req, res) => {
  if (useMongoDb) {
    PlantModel.findById(req.params.id)
      .then(plant => {
        if (!plant) return res.status(404).json({ error: 'Plant not found' });
        
        const now = new Date();
        
        // Update the plant's watering information
        plant.lastWatered = now;
        plant.wateringHistory.push({ date: now });
        plant.nextWatering = calculateNextWatering(now, plant.wateringFrequency);
        
        return plant.save();
      })
      .then(updatedPlant => {
        res.json(updatedPlant);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    // Fallback to in-memory storage
    const id = parseInt(req.params.id);
    const index = plants.findIndex(p => p._id === id);
    if (index === -1) return res.status(404).json({ error: 'Plant not found' });
    
    const now = new Date();
    
    // Create/update watering history if it doesn't exist
    if (!plants[index].wateringHistory) {
      plants[index].wateringHistory = [];
    }
    
    // Update the plant's watering information
    plants[index].lastWatered = now;
    plants[index].wateringHistory.push({ date: now });
    plants[index].nextWatering = calculateNextWatering(now, plants[index].wateringFrequency || 7);
    
    res.json(plants[index]);
  }
});

// Get watering schedule for all plants
app.get('/wateringSchedule', (req, res) => {
  if (useMongoDb) {
    PlantModel.find({})
      .then(plants => {
        const scheduleData = plants.map(plant => ({
          _id: plant._id,
          name: plant.name,
          lastWatered: plant.lastWatered,
          nextWatering: plant.nextWatering,
          wateringFrequency: plant.wateringFrequency,
          waterneeds: plant.waterneeds,
          image: plant.image
        }));
        res.json(scheduleData);
      })
      .catch(err => {
        console.error("Error fetching watering schedule:", err);
        res.status(500).json({ error: err.message });
      });
  } else {
    // Fallback to in-memory storage
    const scheduleData = plants.map(plant => ({
      _id: plant._id,
      name: plant.name,
      lastWatered: plant.lastWatered,
      nextWatering: plant.nextWatering,
      wateringFrequency: plant.wateringFrequency || 7,
      waterneeds: plant.waterneeds,
      image: plant.image
    }));
    res.json(scheduleData);
  }
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is Running on port ${process.env.PORT || 3001}`);
});