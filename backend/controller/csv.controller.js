import { Upload } from "../model/csv.model.js";

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
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      console.error(error);
      res.status(400).send('Error uploading file');
    }
  }

  async getUploadedFiles() {
    try {
      console.log('Fetching uploaded files...');
      const files = await Upload.find({}, { filename: 1, filePath: 1, size: 1 });
      return files;
    } catch (error) {
      throw new Error('Failed to fetch uploaded files');
    }
  }
}