const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL
const DB_NAME  = process.env.DB_NAME


console.log('MONGO_URL',MONGO_URL,DB_NAME )
mongoose.connect(MONGO_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to DB...');
})
.catch((err) => {  
    console.error('Error:', err);
});




// Make folder backend
// make inside backend folder - middleware, routes, utils , db.js, .env, index.js, models
//cd backend 
//npm init
// npm i cors body-parser cookie-parser redux mongoose nodemon dotenv express

// connection mongodb add index.js right code
// db.js and .env mongo url and all
// WHere get and ho get Mongo Url - gotocompass 

// mongodb://localhost:27017
// Click "Connect"
// mongodb://localhost:27017/taskManagerDB
// write this code inside index.js
// ----------------index.js--------------
// indexedDB.js
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDB Connected");
// }).catch(err => {
//     console.error("MongoDB Connection Error:", err);
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
// --------------------------------------
// .env
// ----------------.env--------------
// PORT=5000
// FRONTEND_URL=http://localhost:3001
// JWT_SECRET_KEY=priti123
// JWT_REFRESH_SECRET_KEY=priti123
// MONGO_URI=mongodb://localhost:27017/task-management
// --------------------------------------


