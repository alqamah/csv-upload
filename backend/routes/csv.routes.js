import express from 'express';
import multer from 'multer';
import path from 'path';
import csvController from '../controller/csv.controller.js';

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: 'uploads/', // Directory for uploaded files
    filename: (req, file, cb) => {
      // Use the original filename
      cb(null, file.originalname);
    }
  });

//config of multer for file-storage
const upload = multer({storage: storage}); // Directory for uploaded files
const controller = new csvController();
// Route for handling file uploads
router.post('/', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).send('No file uploaded');
    }
  
    console.log('File received:', req.file);
    controller.uploadCsv(req, res);
  });

export default router;