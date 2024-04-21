import { Upload } from "../model/csv.model.js";

export default class csvController {
    constructor() {
        this.upload = Upload;
    }
    async uploadCsv(req, res) {
        try {
            if(!req.file){
                return res.status(400).send("No file uploaded");
            }
            const { filename, path, size } = req.file;
            console.log(`Filename: ${filename},path: ${path},size: ${size}`);
            const newUpload = new this.upload({ filename, path, size });
            await newUpload.save();
            console.log("file uploaded successfully");
            res.status(200).send("File uploaded successfully");
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}