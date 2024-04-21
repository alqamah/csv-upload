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
app.use('/', csvRouter);

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

export default app;