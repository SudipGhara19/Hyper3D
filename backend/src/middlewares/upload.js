import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure 'uploads/' folder exists
const uploadDir = path.resolve('uploads/');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

export default upload;
