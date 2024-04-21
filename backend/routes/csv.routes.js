import express from 'express';
import multer from 'multer';
import path from 'path';
import csvController from '../controller/csv.controller.js';
import { storage } from '../config/upload.middleware.js';

const router = express.Router();
const controller = new csvController();

// Middleware for handling file uploads
const upload = multer({storage: storage}); 

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