import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FileUpload from './FileUpload';
import './styles.css'; // Import the CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div className="container">
            <FileUpload />
        </div>
    </React.StrictMode>
);