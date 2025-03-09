import express from 'express';
import upload from '../middlewares/upload.js';
import { uploadModel } from '../controllers/file.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const fileRoutes = express.Router();

fileRoutes.post('/upload', verifyToken, upload.single('modelFile'), uploadModel);

export default fileRoutes;
