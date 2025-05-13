# Application Development and Emerging Technologies

## Folder Structure
- **express-server**: contains the server application written in Express
- **mobile-client**: contains the mobile application written in React Native
- **web-client**: contains the web application written in React


###
## Dependencies for GitHub Clone
1. Express Server (Backend)
Runtime: Node.js
Dependencies:
express (^5.1.0) - Web server framework
mongoose (^8.14.1) - MongoDB ODM
cors (^2.8.5) - Cross-origin resource sharing
multer (^1.4.5-lts.2) - File upload handling
nodemon (^3.1.10) - Development server with auto-restart

2. Web Client (Frontend)
Framework: React (^18.2.0) with Vite (^5.0.8)
Dependencies:
react-router-dom (^6.22.1) - Routing
axios (^1.6.2) - HTTP client
tailwindcss (^3.3.5) - CSS framework
bootstrap (^5.3.2) - UI components

3. Mobile Client (Botaniq)
Framework: React Native via Expo (^53.0.7)
Dependencies:
expo-router (^5.0.5) - Navigation
react-native-paper (^5.14.0) - UI components
@expo/vector-icons (^14.1.0) - Icon set
@react-native-picker/picker (^2.11.0) - Picker component
Technology Stack
Database:
MongoDB Atlas (Cloud-hosted)
Connection string: mongodb+srv://username:[password]@cluster0.v51u5et.mongodb.net
Server:
Express.js running on Node.js
RESTful API architecture
Port: 3001
Backend Features:
MongoDB integration with Mongoose ODM
File uploads with multer
Fallback to in-memory storage when MongoDB is unavailable
Plant model with water scheduling capabilities

###
   # Server Setup
   cd express-server
   npm install
   npm start
   
   # Web Client Setup
   cd web-client/client
   npm install
   npm run dev
   
   # Mobile Client Setup
   cd mobile-client/Botaniq
   npm install
   npx expo start