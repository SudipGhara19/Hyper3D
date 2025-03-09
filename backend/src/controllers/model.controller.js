
import User from "../models/main.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import slugify from "slugify";

// -------------------- Create Model Data --------------------
export const createModelData = async (req, res, next) => {
    const userId = req.user.userId
    const { name, description, modelUrl, folderName } = req.body;

    if (!folderName?.trim() || !name?.trim() || !modelUrl?.trim()) {
        return next(new ErrorHandler(400, "Folder name, model name, and model URL are required."));
    }

    try {
        const user = await User.findOne({
            _id: userId,
            "folders.name": folderName
        });

        if (!user) {
            return next(new ErrorHandler(404, "Folder not found."));
        }

        // Locate the folder
        const folder = user.folders.find(folder => folder.name === folderName);

        // Check if model with same slug already exists
        const existingModel = folder.models.find(m => m.slug === slugify(name, { lower: true }));
        if (existingModel) {
            return next(new ErrorHandler(400, "Model with this name already exists in the folder."));
        }

        // Create new model entry
        const newModel = {
            name,
            slug: slugify(name, { lower: true }),
            description,
            modelUrl,
            uploadedAt: new Date()
        };

        folder.models.push(newModel);

        await user.save();

        res.status(201).json({
            success: true,
            message: "Model data created successfully",
            model: newModel,
            folders: user.folders
        });
    } catch (error) {
        next(new ErrorHandler(500, "Internal server error"));
    }
};
