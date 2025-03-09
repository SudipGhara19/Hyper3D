import cloudinary from '../config/cloudinary.js';
import fs from 'fs/promises';

export const uploadModel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('✅ File received:', req.file);

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'raw',
            folder: '3d_models',
            timeout: 30000  // 30 seconds timeout for large files
        });

        console.log('✅ Cloudinary Upload Result:', result);

        await fs.unlink(req.file.path); // Clean temp file

        return res.status(200).json({
            message: 'File uploaded successfully',
            url: result.secure_url,
        });

    } catch (error) {
        console.error('❌ Cloudinary Error:', error);

        if (req.file) await fs.unlink(req.file.path);

        const errorMessage = error?.message || 'Internal server error';
        return res.status(500).json({ message: errorMessage });
    }
};
