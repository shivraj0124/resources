import React, { useState } from 'react';

const App = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'fileUpload'); // Replace with your unsigned preset name

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dtwyvz1lv/image/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.secure_url) {
                setFileUrl(data.secure_url);
                setMessage('File uploaded successfully!');
            } else {
                setMessage('Error uploading file.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error uploading file.');
        }
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
            {fileUrl && (
                <p>
                    File URL: <a href={fileUrl} target="_blank" rel="noopener noreferrer">{fileUrl}</a>
                </p>
            )}
        </div>
    );
};

export default App;
