import express, { Request } from 'express';
import multer from 'multer';
import { uploadFile } from '../services/uploadService';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post('/upload', upload.single('file'), async (req: MulterRequest, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileUrl = await uploadFile(req.file);
        res.json({ url: fileUrl });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Upload failed' });
    }
});

export default router; 