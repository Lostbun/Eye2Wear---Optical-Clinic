import mongoose from "mongoose";
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
import messagerouter from "./routes/message.route.js";
import Message from "./models/message.js";
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
const server = http.createServer(app);


//SOCKET I.O. Configuration
// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://www.getpostman.com'],
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'], // Explicitly enable transports
  allowEIO3: true // For compatibility with older clients
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  console.log('Handshake headers:', socket.handshake.headers);
  console.log('Handshake query:', socket.handshake.query);

  socket.onAny((event, ...args) => {
    console.log(`Received event: ${event}`, args);
  });
  // Join a specific conversation room
  socket.on('joinConversation', ({ conversationId, userId }) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined conversation ${conversationId}`);
  });

// In server.js - Update your sendMessage handler
// Update the sendMessage handler
socket.on('sendMessage', async ({ conversationId, message, sender }) => {
  try {
    // Verify sender exists first
    const Model = mongoose.model(sender.role.endsWith('account') ? 
                  sender.role : `${sender.role}account`);
    const userExists = await Model.exists({ _id: sender._id });
    
    if (!userExists) {
      throw new Error('Sender does not exist');
    }

    const newMessage = await Message.create({
      conversationId,
      content: message,
      sender: sender._id,
      senderModel: sender.role.endsWith('account') ? 
                 sender.role : `${sender.role}account`
    });

    // Manually populate
    const senderData = await Model.findById(sender._id)
      .select('patientfirstname patientlastname patientprofilepicture role')
      .lean();

    io.to(conversationId).emit('receiveMessage', {
      _id: newMessage._id,
      content: newMessage.content,
      sender: {
        _id: sender._id,
        name: `${senderData.patientfirstname} ${senderData.patientlastname}`,
        avatar: senderData.patientprofilepicture,
        role: senderData.role
      },
      createdAt: newMessage.createdAt
    });

  } catch (err) {
    console.error('Message error:', err);
    socket.emit('messageError', { error: err.message });
  }
});

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});




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

app.get("/", (req, res) => {
    res.send("Hello from Althea Ebora");
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