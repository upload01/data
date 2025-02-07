const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
app.use(cors());

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Upload file
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.originalname });
});

// Get all files
app.get('/files', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) return res.status(500).send(err);
        res.json(files);
    });
});

// Delete file
app.delete('/files/:filename', (req, res) => {
    const { filename } = req.params;
    fs.unlink(path.join('uploads', filename), (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'File deleted' });
    });
});

// Download file
app.get('/files/download/:filename', (req, res) => {
    const { filename } = req.params;
    res.download(path.join('uploads', filename));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});