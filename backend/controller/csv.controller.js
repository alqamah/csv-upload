import { Upload } from "../model/csv.model";

export default class csvController {
    constructor() {
        this.upload = Upload;
    }
    async uploadCSV(req, res) {
        try {
            if(!req.file){
                return res.status(400).send("No file uploaded");
            }
            const { filename, path: filepath, size } = req.file;
            const newUpload = new this.upload({ filename, path, size });
            await newUpload.save();
            res.status(200).send("File uploaded successfully");
        } catch (error) {
            res.status(400).send(error);
        }
    }
}