import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        const response = await axios.get('http://localhost:5000/files');
        setFiles(response.data);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post('http://localhost:5000/upload', formData);
        fetchFiles();
    };

    const handleDelete = async (filename) => {
        await axios.delete(`http://localhost:5000/files/${filename }`);
        fetchFiles();
    };

    const handleDownload = (filename) => {
        window.open(`http://localhost:5000/files/download/${filename}`, '_blank');
    };

    return (
        <div>
            <h1>File Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((filename) => (
                    <li key={filename}>
                        {filename}
                        <div>
                            <button onClick={() => handleDownload(filename)}>Download</button>
                            <button onClick={() => handleDelete(filename)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileUpload;