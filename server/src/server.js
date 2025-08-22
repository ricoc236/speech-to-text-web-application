const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config();


/*routes*/
const {connectDB, getDB} = require('../mongo/config/mongodb');
const authRoutes = require('./routes/authRoute');
const transcribeRoutes = require('./routes/transcribeRoute');
const historyRoutes = require('./routes/historyRoute');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));
app.use(cors({
    //http://localhost:5173
    origin: 'https://speech-to-text-web-application.vercel.app/',
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
        app.use('/transcribe', transcribeRoutes);
        app.use('/history', historyRoutes); 
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); 
    }
}

start();

