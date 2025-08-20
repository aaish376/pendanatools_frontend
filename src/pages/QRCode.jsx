import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";
import { QRCodeCanvas } from "qrcode.react";
import JsBarcode from "jsbarcode";

export default function QRCodePage() {
  const [scanResult, setScanResult] = useState("");
  const [status, setStatus] = useState("⌛ Waiting for scan...");
  const [mode, setMode] = useState("camera"); // "camera" | "file"
  const [text, setText] = useState("");
  const [format, setFormat] = useState("QR_CODE");
  const [filePreview, setFilePreview] = useState(null);

  const videoRef = useRef(null);
  const barcodeRef = useRef(null);
  const codeReaderRef = useRef(null);
  const qrCanvasRef = useRef(null);

  // 🛑 Stop and release camera
  const stopCamera = () => {
    if (codeReaderRef.current) {
      try {
        codeReaderRef.current.stopContinuousDecode();
      } catch (e) {}
      try {
        codeReaderRef.current.stopStreams();
      } catch (e) {}
      codeReaderRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // 🎥 Camera scanning effect
  useEffect(() => {
    if (mode !== "camera" || !videoRef.current) {
      stopCamera();
      return;
    }

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    let lastDetected = Date.now();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        setScanResult(result.getText());
        setStatus(`✅ Code detected! Format: ${result.getBarcodeFormat()}`);
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
    });

    return () => {
      stopCamera(); // cleanup when mode changes or unmount
    };
  }, [mode]);

  // 📴 Stop camera when tab is hidden or page unloads
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stopCamera();
      } else if (mode === "camera" && videoRef.current) {
        // restart when tab becomes visible again
        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;
        codeReader.decodeFromVideoDevice(null, videoRef.current, () => {});
      }
    };

    const handleBeforeUnload = () => {
      stopCamera();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      stopCamera();
    };
  }, [mode]);

  // 📂 File scanning
  const handleFileScan = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    stopCamera(); // ensure camera is off

    const codeReader = new BrowserMultiFormatReader();
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    setFilePreview(img.src);

    img.onload = async () => {
      try {
        const result = await codeReader.decodeFromImageElement(img);
        setScanResult(result.getText());
        setStatus(`✅ Code detected from file! Format: ${result.getBarcodeFormat()}`);
      } catch (err) {
        setScanResult("");
        setStatus("❌ No code detected in file.");
        console.error("File scan error:", err);
      }
    };
  };

  // 🏭 Generate barcode dynamically
  useEffect(() => {
    if (format !== "QR_CODE" && text && barcodeRef.current) {
      try {
        JsBarcode(barcodeRef.current, text, {
          format,
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

  // ⬇️ Download code
  const handleDownload = () => {
    if (format === "QR_CODE" && qrCanvasRef.current) {
      const url = qrCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      link.click();
    } else if (barcodeRef.current) {
      const svg = barcodeRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "barcode.png";
        link.click();
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-3 sm:p-6">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl p-5 sm:p-8 border border-gray-200">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 text-purple-600">
          ✨ Barcode & QR Code Tool
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          {/* Scanner */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-md">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-green-700 flex items-center gap-2">
                📷 Scan Codes
              </h2>
              <button
                onClick={() => setMode(mode === "camera" ? "file" : "camera")}
                className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base rounded-lg font-medium bg-green-600 text-white hover:bg-green-700 transition"
              >
                Switch to {mode === "camera" ? "File" : "Camera"} Mode
              </button>
            </div>

            <div className="border-2 border-dashed border-green-400 rounded-lg p-3 bg-white min-h-[200px] sm:min-h-[250px] flex items-center justify-center">
              {mode === "camera" ? (
                <video ref={videoRef} className="w-full rounded-lg" muted autoPlay playsInline />
              ) : (
                <div className="flex flex-col items-center gap-3 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileScan}
                    className="w-full text-sm sm:text-base"
                  />
                  {filePreview && (
                    <img src={filePreview} alt="Selected" className="max-h-48 rounded-lg border" />
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-white border rounded-lg shadow-sm">
              {scanResult ? (
                <p className="text-green-600 font-medium break-words text-sm sm:text-base">
                  ✅ <span className="font-bold">Scanned Data:</span>
                  <br />
                  {scanResult}
                </p>
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">{status}</p>
              )}
            </div>
          </div>

          {/* Generator */}
          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-md">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-700 flex items-center gap-2">
                📝 Generate Codes
              </h2>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-xs sm:text-sm md:text-base"
              >
                <option value="QR_CODE">QR Code</option>
                <option value="CODE128">BarCode128</option>
               
              </select>
            </div>

            <textarea
              className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base text-gray-700 focus:ring-2 focus:ring-blue-400 mb-4 h-24 sm:h-32 shadow-sm"
              placeholder="✍️ Enter text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            {text ? (
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-white rounded-xl shadow-md border">
                  {format === "QR_CODE" ? (
                    <QRCodeCanvas ref={qrCanvasRef} value={text} size={160} />
                  ) : (
                    <svg ref={barcodeRef}></svg>
                  )}
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm md:text-base"
                >
                  ⬇️ Download PNG
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-center text-sm sm:text-base">
                ⬆️ Enter something above to generate a code.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
