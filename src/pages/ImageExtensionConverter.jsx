import React, { useState } from "react";

export default function ImageExtensionConverter() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [originalExt, setOriginalExt] = useState("");
  const [targetExt, setTargetExt] = useState("");

  const allowedExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];

  // Handle File Upload
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      alert("Please upload an image file (png, jpg, jpeg, gif, bmp, webp).");
      return;
    }

    setFile(uploadedFile);
    setFileName(uploadedFile.name.split(".")[0]);
    setOriginalExt(ext);
    setTargetExt(""); // reset target
  };

  // Handle Conversion (simulate download with new extension)
  const handleDownload = () => {
    if (!file || !targetExt) {
      alert("Please upload a file and select a target extension.");
      return;
    }

    const link = document.createElement("a");
    link.download = `PendanaTool_${fileName}.${targetExt}`;
    link.href = URL.createObjectURL(file);
    link.click();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-8 w-full max-w-sm sm:max-w-md text-center transition-transform transform hover:scale-105 duration-300">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-blue-600">
          🖼️ Image Converter
        </h1>

        <p className="text-gray-700 text-sm sm:text-base mb-6">
          Upload an image, choose a new extension, and download it instantly.
        </p>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 block w-full text-xs sm:text-sm text-gray-700
          file:mr-2 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4
          file:rounded-lg sm:file:rounded-xl file:border-0
          file:text-xs sm:file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer transition duration-300"
        />

        {file && (
          <div className="mt-6 space-y-5">
            {/* File Info Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">
              <div className="flex justify-between text-xs sm:text-sm text-gray-700">
                <span className="font-medium">Detected Extension:</span>
                <span className="uppercase font-bold text-black">
                  {originalExt}
                </span>
              </div>
            </div>

            {/* Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 w-full space-y-2 sm:space-y-0">
              <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                Convert To:
              </span>

              {/* Dropdown wrapper */}
              <div className="relative flex-grow">
                <select
                  value={targetExt}
                  onChange={(e) => setTargetExt(e.target.value)}
                  className="w-full p-2 pr-8 rounded-xl border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 appearance-none"
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {allowedExtensions
                    .filter((ext) => ext !== originalExt)
                    .map((ext) => (
                      <option key={ext} value={ext}>
                        {ext.toUpperCase()}
                      </option>
                    ))}
                </select>

                {/* Custom Dropdown Arrow */}
                <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-500">
                  ▼
                </span>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition duration-300"
            >
              ⬇️ Download as {targetExt || "..."}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
