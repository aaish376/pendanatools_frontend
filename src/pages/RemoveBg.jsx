import React, { useState } from 'react';
import { removeBackgroundAPI } from '../services/api';

function RemoveBg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [resultURL, setResultURL] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // ✅ error state

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    setOriginalFileName(file.name.split('.')[0]);
    setResultURL(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setError(''); // reset error message

    try {
      const resultBlob = await removeBackgroundAPI(selectedFile);
      const resultObjectURL = URL.createObjectURL(resultBlob);
      setResultURL(resultObjectURL);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to remove background. Please try again or check your connection.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 relative overflow-hidden">

      {/* Blur Overlay while loading */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <div className="text-xl font-semibold text-blue-600 mb-4">
            Removing background
            <span className="animate-pulse">...</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold text-blue-500 mb-6">Remove Background</h1>

      {/* ✅ Show error message */}
      {error && (
        <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded border border-red-300 max-w-sm text-center">
          {error}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewURL && (
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Original Image:</h2>
          <img src={previewURL} alt="Original" className="max-w-sm rounded shadow" />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className={`${
          loading || !selectedFile
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded shadow transition`}
      >
        Remove Background
      </button>

      {resultURL && (
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Result:</h2>
          <img src={resultURL} alt="Result" className="max-w-sm rounded shadow" />
          <a
            href={resultURL}
            download={`PendanaTools_${originalFileName}.png`}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default RemoveBg;
