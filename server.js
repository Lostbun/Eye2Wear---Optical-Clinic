import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import patientrouter from "./routes/patientaccount.route.js";
import adminrouter from "./routes/adminaccount.route.js";
const {Connection} = mongoose;




//Loading Dotenv Data
dotenv.config();

//Storing MONGO URI & MONGO PORT from .env file
// eslint-disable-next-line no-undef
const mongoPort = process.env.MONGO_PORT;
// eslint-disable-next-line no-undef
const mongoUri = process.env.MONGO_URI;






//Middleware Configuration
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', //The frontend URL
  credentials: true,
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type', 'Authorization']
}));
//app.use(express.json());
//app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


//Routes
app.use("/api/patientaccounts", patientrouter);
//Routes
app.use("/api/adminaccounts", adminrouter);







app.get("/", (req, res) => {
    res.send("Hello from Althea Ebora");
  });







//ALLOW FILTERING OF PROPERTIES NOT DEFINED IN MODEL SCHEMA
mongoose.set("strictQuery", false);
//MONGO DB ATLAS CONNECTION VALIDATION
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(3000, () => {
      console.log("Listening to port", mongoPort);
      console.log("Database connection success", mongoUri);
    });
  })
  .catch((error) => console.error("Database connection error:", error));