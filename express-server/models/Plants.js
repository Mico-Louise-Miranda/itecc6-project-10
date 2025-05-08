const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    sunreq: { type: String, required: true },
    waterneeds: { type: String, required: true },
    soiltype: { type: String, required: true }
});

const PlantModel = mongoose.model('Plants', plantSchema);

module.exports = PlantModel;
