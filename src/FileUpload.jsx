const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('uploads'));

// Endpoint to upload files
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
});

// Endpoint to fetch files
app.get('/files', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) return res.status(500).send(err);
        res.json(files);
    });
});

// Endpoint to delete files
app.delete('/files/:filename', (req, res) => {
    const { filename } = req.params;
    fs.unlink(path.join('uploads', filename), (err) => {
        if (err) return res.status(500).send(err);
        res.send('File deleted successfully');
    });
});

// Endpoint to download files
app.get('/files/download/:filename', (req, res) => {
    const { filename } = req.params;
    res.download(path.join('uploads', filename));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});