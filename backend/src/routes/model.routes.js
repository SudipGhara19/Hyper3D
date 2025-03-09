import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createModelData } from "../controllers/model.controller.js";

const modelRoutes = express.Router();

modelRoutes.post('/create', verifyToken, createModelData);

export default modelRoutes;