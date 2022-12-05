const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');


// Import Routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const postRoutes = require('./routes/posts');
const announcementRoutes = require('./routes/announcements');

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

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Route Middlewares
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/events/announcements", announcementRoutes);
app.use("/api/posts", postRoutes);


app.listen(process.env.PORT, () => {
    console.log('Server backend is running now :)')
})