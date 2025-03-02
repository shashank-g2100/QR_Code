"use client"

import { useState } from "react";
import axios from "axios";

export function QRCodeGenerator() {
    const [text, setText] = useState("");
    const [qrCode, setQrCode] = useState("");

    const generateQRCode = async () => {
        if (!text) return;
        try {
            const response = await axios.get(`http://localhost:5000/generate?text=${encodeURIComponent(text)}`);
            setQrCode(response.data.qrCode);
        } catch (error) {
            console.error("QR Code generation failed", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold text-center text-black mb-4">QR Code Generator</h2>
                <input
                    type="text"
                    placeholder="Enter text or URL"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border text-gray-400 font-medium rounded mb-4"
                />
                <button
                    onClick={generateQRCode}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    Generate QR Code
                </button>
                {qrCode && (
                    <div className="mt-4 flex flex-col items-center">
                        <img src={qrCode} alt="QR Code" className="w-40 h-40" />
                        <a href={qrCode} download="qrcode.png" className="mt-2 text-blue-600 underline">
                            Download QR Code
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
