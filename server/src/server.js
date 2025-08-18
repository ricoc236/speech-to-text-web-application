const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();
const {connectDB, getDB} = require('../mongo/config/mongodb');
const authRoutes = require('./routes/auth');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,  
}));


async function start() {
    try {
        await connectDB();

        console.log('Database connection established successfully');

        app.get('/', (req, res) => {
                res.send('this is server');
            });

        /*routes*/
        app.use('/auth', authRoutes);

        const PORT = process.env.PORT;
        app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); //exit the process if the database connection fails
    }
}

start();

