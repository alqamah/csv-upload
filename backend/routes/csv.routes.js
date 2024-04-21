import express from 'express';
import multer from 'multer';
import csvController from '../controller/csv.controller.js';
import { storage } from '../config/upload.middleware.js';

const router = express.Router();
const controller = new csvController();

// Middleware for handling file uploads
const upload = multer({ storage: storage });

// Route for fetching the list of uploaded files
router.get('/home', async (req, res) => {
  console.log('Fetching uploaded files...');
  try {
    const files = await controller.getUploadedFiles(req,res);
    console.log('Files fetched:', files);
    res.json(files);
  } catch (error) {
    console.log('Error fetching uploaded files:', error);
    res.status(500).json({ error: 'Failed to fetch uploaded files' });
  }
});


// Route for handling file uploads
router.post('/', upload.single('csvFile'), (req, res, next) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).send('No file uploaded');
  }
  controller.uploadCsv(req, res);
  next();
});


export default router;