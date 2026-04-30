"use client";

import { QRCodeCanvas } from "qrcode.react";

interface QRProps {
    value: string;
}

export default function CryptoQRCode({ value }: QRProps) {
    if (!value) return null;

    return (
        <div className="flex flex-col items-center gap-2 mt-4">

            <div className="p-3 bg-white rounded border shadow-sm">
                <QRCodeCanvas value={value} size={220} />
            </div>

            <p className="text-xs text-black text-center">
                Scan this QR code to send funds
            </p>
        </div>
    );
}