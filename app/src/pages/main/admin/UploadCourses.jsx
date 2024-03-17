import React, { useState } from 'react';
import axios from 'axios';

const  UploadCourses = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const BASEURL=process.env.REACT_APP_BASEURL

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace 'YOUR_UPLOAD_ENDPOINT' with the actual API endpoint for file upload
            const uploadUrl = `${BASEURL}/course/uploadCourseExcelFile`;

            // Send the file to the server using axios
            const response = await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the server response, e.g., show a success message
            alert('Upload successful:');
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle the error, e.g., show an error message
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Upload Excel File </h2>
            <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 mb-4"
            />
            <button
                onClick={handleUpload}
                disabled={!file}
                className={`bg-blue-500 text-white px-4 py-2 rounded ${!file && 'opacity-50 cursor-not-allowed'
                    }`}
            >
                Upload
            </button>
        </div>
    );
};

export default UploadCourses;
