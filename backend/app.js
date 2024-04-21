import express from 'express';
import path from 'path';
import csvRouter from './routes/csv.routes.js';

const app = express();

// Serve static files from the "frontend" directory
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, './frontend')));

// Middleware for handling JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use the csvRouter for handling CSV-related routes
app.use('/',(req,res,next)=>{
  console.log('Request received at /',req.url, req.method);
  next();
},csvRouter);

// Catch-all route to serve the index.html file
app.get('/', (req, res) => {
  console.log('sending index.html file');
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

export default app;