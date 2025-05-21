# Plant Care Tracker - Express Server

Backend server for the Plant Care Tracker application built with Express.js and MongoDB.

## Setup Instructions

1. Install dependencies:

```
npm install
```

2. Configure environment variables:
   - Create a `.env` file in the root directory
   - Copy contents from `.env.sample` and replace with your actual values:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/<database>?retryWrites=true&w=majority
PORT=3001
```

3. Run the server:

```
npm start index.js
```

## Features

- RESTful API for plant management
- MongoDB Atlas integration with fallback to in-memory storage
- Image upload functionality
- Plant watering schedule tracking

## API Endpoints

| Method | Endpoint          | Description                          |
| ------ | ----------------- | ------------------------------------ |
| GET    | /                 | Get all plants                       |
| POST   | /addPlant         | Add a new plant                      |
| GET    | /getPlant/:id     | Get a specific plant by ID           |
| PUT    | /updatePlant/:id  | Update a plant                       |
| DELETE | /deletePlant/:id  | Delete a plant                       |
| POST   | /waterPlant/:id   | Mark a plant as watered              |
| GET    | /wateringSchedule | Get watering schedule for all plants |
| POST   | /upload           | Upload a plant image                 |

## Database

Connected to MongoDB Atlas with Mongoose ODM.

# Command to view the data input to our database: "node view-data.js"

# Connected to MongoDB Atlas successfully

==== ALL PLANTS IN DATABASE ====

Result for mock data:

--- Plant 1 ---
ID: 681de4cc2d87989d8686929c
Name: Alocasia Polly
Description: Alocasia Polly is a compact variety with striking arrow-shaped, dark green leaves with white veining.
Sun Requirements: Bright, indirect light
Water Needs: Keep soil moist
Soil Type: Well-draining potting mix
Image URL: http://localhost:3001/uploads/1746789580727-alocasia-polly.jpg
Last Watered: Tue May 13 2025
Next Watering: Fri May 16 2025
Watering Frequency: Every 3 days
Watering History: 4 entries

- Fri May 09 2025
- Fri May 09 2025
- Tue May 13 2025
  ... and 1 more entries

--- Plant 2 ---
ID: 681de5c82d87989d868692b1
Name: Serene Sanseviera
Description: Also known as Snake Plant, Sanseviera is known for its upright, sword-like leaves and air-purifying qualities.
Sun Requirements: Medium to Low Light
Water Needs: Every 2-3 weeks
Soil Type: Sandy
Image URL: http://localhost:3001/uploads/1746789832758-serene-sanseviera.jpg
Last Watered: Tue May 13 2025
Next Watering: Fri May 30 2025
Watering Frequency: Every 17 days
Watering History: 5 entries

- Fri May 09 2025
- Fri May 09 2025
- Fri May 09 2025
  ... and 2 more entries

--- Plant 3 ---
ID: 681de63f2d87989d868692b5
Name: Fiddle Leaf Fig
Description: The Fiddle Leaf Fig is a famous for its large, violin-shaped leaves and makes a dramatic statement in any space.
Sun Requirements: Bright, indirect light
Water Needs: Weekly
Soil Type: Well-draining potting mix
Image URL: http://localhost:3001/uploads/1746789951168-fiddle-leaf-fig.jpg
Last Watered: Tue May 13 2025
Next Watering: Tue May 20 2025
Watering Frequency: Every 7 days
Watering History: 5 entries

- Fri May 09 2025
- Fri May 09 2025
- Tue May 13 2025
  ... and 2 more entries

Total plants: 3

Database connection closed
