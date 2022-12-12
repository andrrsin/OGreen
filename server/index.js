const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
// Import Routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const postRoutes = require('./routes/posts');
const announcementRoutes = require('./routes/announcements');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config();

  
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).
    then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });
app.use((req, res, next) => {
        res.header("Access-Control-Allow-Credentials", true);
        next();
      });
app.use(express.json());
      app.use(
        cors({
          origin: "http://localhost:3000",
        })
      );
      app.use(cookieParser());
      
app.use("/public/images/", express.static(path.join(__dirname, "/public/images/")));
// Middleware
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
}));
app.use(morgan('common'));
app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});


// Route Middlewares
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events/announcements", announcementRoutes);
app.use("/api/posts", postRoutes);


app.listen(process.env.PORT, () => {
    console.log('Server backend is running now :)')
})