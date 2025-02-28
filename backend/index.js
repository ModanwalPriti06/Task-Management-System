require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// express.json()- Built-in middleware
// cors (Cross-Origin Resource Sharing) - Third-party Middleware 

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.error("MongoDB Connection Error:", err);
});

// Routes Middleware ( appplication middleware - app.use())
app.use("/api", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
