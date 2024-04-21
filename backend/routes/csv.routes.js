import express from 'express';
import multer from 'multer';
import path from 'path';
import csvController from '../controller/csv.controller';

const router = express.Router();

//config of multer for file-storage
const upload = multer({ 
    dest: 'uploads/', // Directory for uploaded files
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
}); 

// Route for handling file uploads
router.post('/upload', upload.single('csvFile'), csvController.uploadCSV);

export default router;