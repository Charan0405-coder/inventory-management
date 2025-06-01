import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Directory for storing uploads
const UPLOAD_DIR = path.join(__dirname, '../../public/uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export const uploadFile = async (file: Express.Multer.File) => {
    try {
        const fileExtension = path.extname(file.originalname);
        const fileName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        
        // Write file to disk
        fs.writeFileSync(filePath, file.buffer);
        
        // Return the URL that will be accessible through Render
        // Replace YOUR_RENDER_SERVICE_NAME with your actual Render service name
        return `https://${process.env.RENDER_SERVICE_NAME}.onrender.com/uploads/${fileName}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('File upload failed');
    }
} 