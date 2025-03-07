import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import errorMiddleware from './src/middlewares/errorMiddleware.js';
import authRoutes from './src/routes/auth.routes.js';
import folderRoutes from './src/routes/folder.routes.js';

dotenv.config();
const app = express();
const port = process.env.PORT

const allowedOrigins = "http://localhost:5173"

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Manual CORS Middleware (if needed)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Opener-Policy');
    res.removeHeader('Cross-Origin-Embedder-Policy');
    next();
});


//-------------------------------------------Connecting to the DataBase-------------------------
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log(`MongoDB Database is connected:::`)
    })
    .catch((err) => {
        console.log(`Error connecting to the database:: ${err}`);
    })



//----------------------------------- Routes -----------------------------------------
app.use('/api/auth', authRoutes);
app.use('/api/folder', folderRoutes);

//-------------------------------Error Middleware--------------------------------------
app.use(errorMiddleware);


//------------------------------------------- Running the Backend Server-----------------------------
app.listen(port, () => {
    console.log(`Backend server is up and running on PORT: ${port}`);

});