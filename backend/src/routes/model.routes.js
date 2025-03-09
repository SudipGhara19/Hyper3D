import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createModelData, deleteModelData } from "../controllers/model.controller.js";

const modelRoutes = express.Router();

modelRoutes.post('/create', verifyToken, createModelData);
modelRoutes.delete('/delete', verifyToken, deleteModelData);

export default modelRoutes;