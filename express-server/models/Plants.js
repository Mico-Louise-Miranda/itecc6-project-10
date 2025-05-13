const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    sunreq: { type: String, required: true },
    waterneeds: { type: String, required: true },
    soiltype: { type: String, required: true },
    image: { type: String, default: "" },
    wateringHistory: [{ 
        date: { type: Date, default: Date.now } 
    }],
    lastWatered: { type: Date, default: null },
    nextWatering: { type: Date, default: null },
    wateringFrequency: { type: Number, default: 7 } // Default to 7 days
});

const PlantModel = mongoose.model('Plants', plantSchema);

module.exports = PlantModel;
