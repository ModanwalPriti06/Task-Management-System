// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');


// const dotenv = require('dotenv');
// dotenv.config();

// const port = process.env.PORT;
// require('./db');

// const allowOrigin = [process.env.FRONTEND_URL];

// app.use(
//    cors({
//        origin: function(origin, callback) {
//            if(!origin || allowOrigin.includes(origin)) {
//                callback(null, true);
//            }else{
//                callback(new Error('Not allow by cors'));
//            }
//        },
//        credentials: true
//    })
// )

// app.use(bodyParser.json());
// app.use(cookieParser({
//    httpOnly : true,
//    secure : true,
//    sameSite : 'none',
//    maxAge : 1000* 60 * 60 * 24 * 7,
//    signed: true
// }));


// app.get('/', (req, res)=>{
//    console.log('hello');
//    return res.status(200).send('Hello')
// })

// app.get('/getUserData', (req, res)=>{
//    console.log('hello');
//    return res.status(200).send('Hii')
// })

// app.listen(port, ()=>{
//    console.log(`task management is listening : ${port}`);
// })

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

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.error("MongoDB Connection Error:", err);
});

// Routes Middleware
app.use("/api", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
