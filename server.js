import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import patientrouter from "./routes/patientaccount.route.js";
import adminrouter from "./routes/adminaccount.route.js";
import staffrouter from "./routes/staffacount.route.js";
import ownerrouter from "./routes/owneraccount.route.js";
import forgotpassrouter from "./routes/forgotpass.route.js";
import patientdemographicrouter from "./routes/patientdemographic.route.js";
import accountcreationemailrouter from "./routes/accountcreationemail.route.js";
import accountdeletionemailrouter from "./routes/accountdeletionemail.route.js";
import patientappointmentrouter from "./routes/patientappointment.routes.js";
import otherclinicrouter from "./routes/otherclinic.route.js";
import ambherinventorycategoryrouter from "./routes/ambherinventorycategory.route.js"
import ambherinventoryproductrouter from "./routes/ambherinventoryproduct.route.js"
import bautistainventorycategoryrouter from "./routes/bautistainventorycategory.route.js";
import bautistainventoryproductrouter from "./routes/bautistainventoryproduct.route.js";
import patientwishlistinventoryproductrouter from "./routes/patientwishlist.route.js";
import patientorderambherrouter from "./routes/patientorderambher.route.js";
import patientorderbautistarouter from "./routes/patientorderbautista.route.js";
import Message from "./models/message.js";
import messagerouter from "./routes/message.route.js";
import { updateConversationParticipants } from "./middleware/conversationMiddleware.js";
import Conversation from "./models/conversation.js";
import jwt from 'jsonwebtoken';
const {Connection} = mongoose;
import mongoose from "mongoose";




//Loading Dotenv Data
dotenv.config();

//Storing MONGO URI & MONGO PORT from .env file
// eslint-disable-next-line no-undef
const mongoPort = process.env.MONGO_PORT;
// eslint-disable-next-line no-undef
const mongoUri = process.env.MONGO_URI;






//Middleware Configuration
const app = express();
const server = http.createServer(app);





app.use(cors({
  origin: 'http://localhost:5173', //The frontend URL
  credentials: true,
  methods:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type', 'Authorization', 'X-Requested-With']
}));
/*
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to: ${req.originalUrl}`);
  next();
});
*/
//app.use(express.json());
//app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));




//AI CODDE
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line no-undef
const uploadDir = path.join(process.cwd(), 'uploads', 'message-images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Add this near the image upload directory setup
// eslint-disable-next-line no-undef
const docUploadDir = path.join(process.cwd(), 'uploads', 'message-documents');
if (!fs.existsSync(docUploadDir)) {
  fs.mkdirSync(docUploadDir, { recursive: true });
}










//Routes
app.use("/api/accountdeletion", accountdeletionemailrouter);
//Routes
app.use("/api/accountcreation", accountcreationemailrouter);
//Routes
app.use("/api/auth", forgotpassrouter);
//Routes
app.use("/api/patientaccounts", patientrouter);
//Routes
app.use("/api/adminaccounts", adminrouter);
//Routes
app.use("/api/staffaccounts", staffrouter);
//Routes
app.use("/api/owneraccounts", ownerrouter);
//Routes
app.use("/api/patientdemographics", patientdemographicrouter);
//Routes
app.use("/api/patientappointments", patientappointmentrouter);
//Routes
app.use("/api/otherclinicrecord", otherclinicrouter);
//Routes
app.use("/api/ambherinventorycategory", ambherinventorycategoryrouter);
//Routes
app.use("/api/ambherinventoryproduct", ambherinventoryproductrouter);
//Routes
app.use("/api/bautistainventorycategory", bautistainventorycategoryrouter);
//Routes
app.use("/api/bautistainventoryproduct", bautistainventoryproductrouter);
//Routes
app.use("/api/patientwishlistinventoryproduct", patientwishlistinventoryproductrouter);
//Routes
app.use("/api/patientorderambher", patientorderambherrouter);
//Routes
app.use("/api/patientorderbautista", patientorderbautistarouter);
//Routes
app.use("/api/messages", messagerouter);
//Routes
app.use(updateConversationParticipants);


app.use('/uploads', express.static('uploads'));


app.get("/", (req, res) => {
    res.send("Hello from Althea Ebora");
  });

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Socket.IO middleware for token verification
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }

  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = {
      userId: decoded.id,
      role: decoded.role,
      clinic: decoded.clinic || null
    };
    next();
  } catch (error) {
    next(new Error('Authentication error: Invalid token', error));
  }
});

// Attach io to app for use in controllers
app.set('io', io);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinConversations', async (userId, role, clinic) => {
    try {
      let conversations;
      
      if (role === 'patient') {
        conversations = await Conversation.find({
          'participants.userId': userId,
          'participants.role': role
        });
      } else {
        conversations = await Conversation.find({
          'participants.clinic': clinic,
          clinic: clinic
        });
      }
      
      conversations.forEach(conv => {
        socket.join(conv._id.toString());
        console.log(`User ${socket.id} joined conversation ${conv._id}`);
      });
    } catch (error) {
      console.error('Error joining conversations:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});








//ALLOW FILTERING OF PROPERTIES NOT DEFINED IN MODEL SCHEMA
mongoose.set("strictQuery", false);
//MONGO DB ATLAS CONNECTION VALIDATION
mongoose
  .connect(mongoUri)
  .then(() => {
    server.listen(3000, () => {
      console.log("Listening to port", mongoPort);
      console.log("Database connection success", mongoUri);
    });
  })
  .catch((error) => console.error("Database connection error:", error));