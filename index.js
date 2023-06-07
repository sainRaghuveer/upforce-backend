const express = require('express');
const cors= require('cors');
const { connection } = require('./configs/db');
const { userRouter } = require('./routes/user.route');
const { exportCSVRouter } = require('./routes/exportCSV.route');
require('dotenv').config();


//Created app 
const app = express();


//parsing configuration
app.use(express.json());


//to handle cross origin requests
app.use(cors());


//default route
app.get("/", (req, res) => {
    res.send(`<h1 style="text-align:center; color:blue;">Welcome to the UpForce Backend ... 🪄</h1>`);
});


//user Routes
app.use("/api", userRouter);


//csv download Routes
app.use("/api", exportCSVRouter);


//Server configuration
app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("Connected with UpForce DB");
    }catch(error){
        console.log(error);
    }
    console.log(`Server is running at PORT ${process.env.port}`);
});