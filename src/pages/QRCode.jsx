import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library"; // Needed for error handling
import { QRCodeCanvas } from "qrcode.react"; // For QR generation
import JsBarcode from "jsbarcode"; // For generating barcodes

export default function QRCodePage() {
  const [scanResult, setScanResult] = useState("");
  const [status, setStatus] = useState("⌛ Waiting for scan...");
  const [mode, setMode] = useState("camera"); // "camera" | "file"
  const [text, setText] = useState("");
  const [format, setFormat] = useState("QR_CODE"); // For generation
  const videoRef = useRef(null);
  const barcodeRef = useRef(null);
  const codeReaderRef = useRef(null);

  // Camera scanning
  useEffect(() => {
    if (mode === "camera" && videoRef.current) {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      let lastDetected = Date.now();

      codeReader.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, err) => {
          if (result) {
            setScanResult(result.getText());
            setStatus("✅ Code detected!");
            lastDetected = Date.now();
          }

          if (err) {
            if (err instanceof NotFoundException) {
              if (Date.now() - lastDetected > 2000) {
                setStatus("❌ No code visible...");
              }
            } else {
              console.error("Scan error:", err);
              setStatus("⚠️ Error while scanning!");
            }
          }
        }
      );

      // ✅ Proper cleanup
      return () => {
        if (codeReaderRef.current) {
          try {
            codeReaderRef.current.stopContinuousDecode();
            codeReaderRef.current.stopStreams();
          } catch (e) {
            console.warn("Cleanup error:", e);
          }
          codeReaderRef.current = null;
        }
      };
    }
  }, [mode]);

  // Handle file scanning
  const handleFileScan = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const codeReader = new BrowserMultiFormatReader();
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      try {
        const result = await codeReader.decodeFromImageElement(img);
        setScanResult(result.getText());
        setStatus("✅ Code detected from file!");
      } catch (err) {
        setScanResult("");
        setStatus("❌ No code detected in file.");
        console.error("File scan error:", err);
      }
    };
  };

  // Generate barcode dynamically
  useEffect(() => {
    if (format !== "QR_CODE" && text && barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, text, {
          format: format, // CODE128, EAN13, UPC, ITF
          lineColor: "#000",
          width: 2,
          height: 100,
          displayValue: true,
        });
      } catch (e) {
        console.error("Barcode generation error:", e);
      }
    }
  }, [text, format]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-600">
          ✨ Barcode & QR Code Tool
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Scanner Section */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
              📷 Scan Codes
            </h2>

            {/* Mode Switch */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setMode("camera")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === "camera"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Camera Mode
              </button>
              <button
                onClick={() => setMode("file")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  mode === "file"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                File Mode
              </button>
            </div>

            {/* Scanner Display */}
            <div className="border-2 border-dashed border-green-400 rounded-lg p-3 bg-white min-h-[250px] flex items-center justify-center">
              {mode === "camera" ? (
                <video
                  ref={videoRef}
                  style={{ width: "100%", borderRadius: "10px" }}
                  muted
                  autoPlay
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileScan}
                  className="w-full text-center"
                />
              )}
            </div>

            {/* Result */}
            <div className="mt-5 p-4 bg-white border rounded-lg shadow-sm">
              {scanResult ? (
                <p className="text-green-600 font-medium break-words">
                  ✅ <span className="font-bold">Scanned Data:</span>
                  <br />
                  {scanResult}
                </p>
              ) : (
                <p className="text-gray-500">{status}</p>
              )}
            </div>
          </div>

          {/* Generator Section */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-700">
              📝 Generate Codes
            </h2>

            {/* Input */}
            <textarea
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-5 shadow-sm h-32"
              placeholder="✍️ Enter text (multiline supported)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {/* Format Selector */}
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="mb-5 px-3 py-2 border rounded-lg"
            >
              <option value="QR_CODE">QR Code</option>
              <option value="CODE128">Code128</option>
              <option value="EAN13">EAN-13</option>
              <option value="UPC">UPC</option>
              <option value="ITF">ITF</option>
            </select>

            {/* Code Preview */}
            {text ? (
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-xl shadow-md border">
                  {format === "QR_CODE" ? (
                    <QRCodeCanvas value={text} size={200} />
                  ) : (
                    <svg ref={barcodeRef}></svg>
                  )}
                </div>
                <p className="mt-4 text-gray-600 italic">
                  🎉 Generated {format} for:{" "}
                  <span className="font-bold">{text}</span>
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-center">
                ⬆️ Enter something above to generate a code.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
