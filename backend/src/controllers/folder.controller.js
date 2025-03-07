import User from '../models/main.model.js'
import ErrorHandler from '../utils/ErrorHandler.js';

// ------------------------ ADD Folder --------------------------
export const addFolder = async (req, res, next) => {
    try {
        const { folderName } = req.body;

        if (!req.user) {
            return next(new ErrorHandler(401, "Unauthorized, You are not allowed to perform this task."));
        }

        if (!folderName) {
            return next(new ErrorHandler(400, "Folder name are required."));
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return next(new ErrorHandler(404, "User not found."));
        }

        // Check if folder name already exists
        if (user.folders.some(folder => folder.name === folderName)) {
            return next(new ErrorHandler(400, "Folder name must be unique."));
        }

        // Add the new folder
        user.folders.push({ name: folderName });
        await user.save();

        res.status(201).json({ message: "Folder added successfully.", folders: user.folders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// ------------------------ DELETE Folder --------------------------
export const deleteFolder = async (req, res, next) => {
    try {
        const { folderName } = req.body;

        if (!req.user) {
            return next(new ErrorHandler(401, "Unauthorized, You are not allowed to perform this task."));
        }

        if (!folderName) {
            return next(new ErrorHandler(400, "Folder name is required."));
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return next(new ErrorHandler(404, "User not found."));
        }

        const folderIndex = user.folders.findIndex(folder => folder.name === folderName);
        if (folderIndex === -1) {
            return next(new ErrorHandler(404, "Folder not found."));
        }

        // Remove the folder
        user.folders.splice(folderIndex, 1);
        await user.save();

        res.status(200).json({ message: "Folder deleted successfully.", folders: user.folders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
