import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodePage() {
  const [scanResult, setScanResult] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear(); // stop scanning after first success
      },
      () => {}
    );

    return () => {
      scanner.clear().catch((err) => console.error("Scanner clear error:", err));
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-purple-600">
          ✨ QR Code
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* QR Scanner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
              📷 Scan QR Code
            </h2>
            <div className="border-2 border-dashed border-green-400 rounded-lg p-3 bg-white">
              <div id="reader" className="rounded-lg overflow-hidden" />
            </div>
            <div className="mt-5 p-4 bg-white border rounded-lg shadow-sm">
              {scanResult ? (
                <p className="text-green-600 font-medium break-words">
                  ✅ <span className="font-bold">Scanned Data:</span> <br />{" "}
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
            <input
              type="text"
              className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none mb-5 shadow-sm"
              placeholder="✍️ Enter text to generate QR..."
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
