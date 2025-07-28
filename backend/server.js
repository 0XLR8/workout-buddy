require('dotenv').config();

const express = require('express');
const logger = require('./middleware/logger');
const workoutsRouter = require('./routes/workouts');
const connectDB = require('./db');
const cors = require('cors');

const app = express();

connectDB().then(() => {
    // Middlewares
    app.use(express.json());
    app.use(logger);
    app.use(cors());

    // Routes
    app.use('/api/workouts', workoutsRouter);

    // Server start
    app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT);
    })
}).catch((er) => {
        console.log("MongoDB failed to connect:", er.message)
        process.exit(1);
    }
)
