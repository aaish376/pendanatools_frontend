import React, { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodePage() {
  const [scanResult, setScanResult] = useState("");
  const [mode, setMode] = useState("camera"); // "camera" | "file"
  const [text, setText] = useState("");
  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState(null);
  const scannerRef = useRef(null);

  // start camera scanner
  const startScanner = async (cameraId = null) => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
      }
      const devices = await Html5Qrcode.getCameras();
      setCameras(devices);

      const cam = cameraId || devices[0]?.id;
      setCurrentCamera(cam);

      await scannerRef.current.start(
        { deviceId: { exact: cam } },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setScanResult(decodedText);
        },
        (err) => console.log("Scan error:", err)
      );
    } catch (err) {
      console.error("Camera start error:", err);
    }
  };

  // stop camera scanner
  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.stop();
      await scannerRef.current.clear();
    }
  };

  // scan from file
  const scanFile = async (event) => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await scannerRef.current.scanFile(file, true);
      setScanResult(result);
    } catch (err) {
      console.error("File scan error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-600">
          ✨ QR Code Tool
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* QR Scanner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
              📷 Scan QR Code
            </h2>

            {/* Switch Mode */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => {
                  stopScanner();
                  setMode("camera");
                }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === "camera"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Camera Mode
              </button>
              <button
                onClick={() => {
                  stopScanner();
                  setMode("file");
                }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === "file"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                File Mode
              </button>
            </div>

            <div className="border-2 border-dashed border-green-400 rounded-lg p-3 bg-white">
              <div
                id="reader"
                className="rounded-lg overflow-hidden min-h-[250px] flex items-center justify-center"
              >
                {mode === "file" && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={scanFile}
                    className="w-full text-center"
                  />
                )}
              </div>
            </div>

            {/* Camera Controls */}
            {mode === "camera" && (
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => startScanner()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
                >
                  ▶️ Start Scanning
                </button>
                <button
                  onClick={stopScanner}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow"
                >
                  ⏹ Stop Scanning
                </button>
                {cameras.length > 1 && (
                  <select
                    value={currentCamera || ""}
                    onChange={(e) => startScanner(e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    {cameras.map((cam) => (
                      <option key={cam.id} value={cam.id}>
                        {cam.label || cam.id}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* Result */}
            <div className="mt-5 p-4 bg-white border rounded-lg shadow-sm">
              {scanResult ? (
                <p className="text-green-600 font-medium break-words">
                  ✅ <span className="font-bold">Scanned Data:</span>
                  <br />
                  {scanResult}
                </p>
              ) : (
                <p className="text-gray-500">⌛ Waiting for scan...</p>
              )}
            </div>
          </div>

          {/* QR Generator */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
              📝 Generate QR Code
            </h2>
            <textarea
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-5 shadow-sm h-32"
              placeholder="✍️ Enter text (multiline supported)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text ? (
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-xl shadow-md border">
                  <QRCodeCanvas value={text} size={200} />
                </div>
                <p className="mt-4 text-gray-600 italic">
                  🎉 QR Generated for: <span className="font-bold">{text}</span>
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                ⬆️ Enter something above to generate a QR.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
