import { Upload } from "../model/csv.model.js";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

export default class csvController {
  constructor() {
    this.upload = Upload;
  }

  async uploadCsv(req, res) {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      //console.log('File received:', req.file);

      const { filename, path, size } = req.file;
      const newUpload = new this.upload({ filename, path, size });
      await newUpload.save();

      console.log("File uploaded successfully");
      //res.status(200).send("File uploaded successfully");
      //redirect to homepage
      res.redirect('/home');
    } catch (error) {
      console.error(error);
      res.status(400).send('Error uploading file');
    }
  }

  async getUploadedFiles() {
    try {
      //console.log('Fetching uploaded files...');
      const files = await Upload.find({}, { filename: 1, filePath: 1, size: 1 });
      return files;
    } catch (error) {
      throw new Error('Failed to fetch uploaded files');
    }
  }

  async deleteFile(req, res, next) {
    try {
      const fileId = req.body.fileId;
      const file = await Upload.findById(fileId);
      console.log('Deleting file with id:', fileId);
      await Upload.findByIdAndDelete(fileId);
      
      const filePath = path.join('uploads', file.filename);
      fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }
      console.log('File deleted successfully:', filePath);
      res.json({ message: 'File deleted successfully' });
    });

    }catch (error) {
      console.error(error);
      res.status(400).send('Error deleting file');
    }
  }


  async readFile(req, res) {
    const id = req.query.id;
    try {
      const file = await Upload.findById(id);
      const filePath = path.join(file.path);
      const csvData = [];
      const tableHeaders = [];
      const tableRows = [];
  
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          csvData.push(data);
          if (tableHeaders.length === 0) {
            tableHeaders.push(...Object.keys(data));
          } else {
            const row = [];
            for (const header of tableHeaders) {
              row.push(data[header]);
            }
            tableRows.push(row);
          }
        })
        .on('end', () => {
          res.render('view.ejs', {
            title: file.originalname, // Set the title to the original filename
            file: file, // Pass the file object
            searchQuery: req.query.q || '', // Pass the search query from the request
            tableHeaders: tableHeaders, // Pass the table headers
            tableRows: tableRows, // Pass the table rows
            csvData: csvData, // Pass the CSV data
          });
        });
    } catch (error) {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ error: 'Error reading CSV file' });
    }
  }
}