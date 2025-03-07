import express from "express";
import { addFolder, deleteFolder } from "../controllers/folder.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const folderRoutes = express.Router();

folderRoutes.post('/add', verifyToken ,addFolder);
folderRoutes.delete('/delete', verifyToken, deleteFolder);

export default folderRoutes;