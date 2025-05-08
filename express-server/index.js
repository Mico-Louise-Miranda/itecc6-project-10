const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PlantModel = require('./models/Plants')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/plant-care-tracker-db")

app.get('/', ( req, res)=> {
    PlantModel.find({})
    .then(plants => res.json(plants))
    .catch(err => res.json(err))
})

app.post("/addPlant", (req, res) => {
    console.log("Received request body:", req.body); // DEBUG LINE

    PlantModel.create(req.body)
        .then(plant => {
            console.log("Saved to DB:", plant); // DEBUG LINE
            res.json(plant);
        })
        .catch(err => {
            console.error("Error saving to DB:", err); // DEBUG LINE
            res.status(500).json({ error: err.message });
        });
});




app.listen(3001, () =>{
    console.log("Server is Running")
})