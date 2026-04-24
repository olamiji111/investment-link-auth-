"use client";

import { useEffect, useRef, memo, useState } from "react";

type Interval = "5" | "60" | "240" | "D" | "W" | "M";

const FALLBACK_SYMBOL = "NASDAQ:AAPL";

// simple safety check (no whitelist needed)
const isValidSymbol = (symbol: string) => {
    return typeof symbol === "string" && symbol.includes(":");
};

function TradingViewChart({ symbol }: { symbol: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [interval, setInterval] = useState<Interval>("5");

    const intervals = [
        { label: "5m", value: "5" },
        { label: "1H", value: "60" },
        { label: "4H", value: "240" },
        { label: "1D", value: "D" },
        { label: "1W", value: "W" },
        { label: "1M", value: "M" },
        { label: "Max", value: "M" },
    ];

    // ✅ HARD SAFE SYMBOL (prevents TradingView errors)
    const safeSymbol =
        isValidSymbol(symbol) ? symbol : FALLBACK_SYMBOL;

    // safe interval
    const safeInterval: Interval =
        interval === "M" ? "D" : interval;

    useEffect(() => {
        if (!containerRef.current) return;

        // clear previous widget
        containerRef.current.innerHTML = "";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: safeSymbol,
            interval: safeInterval,
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            allow_symbol_change: true,
            hide_top_toolbar: false,
            hide_legend: false,
            hide_volume: false,
            hide_side_toolbar: false,
            save_image: false,
        });

        containerRef.current.appendChild(script);
    }, [safeSymbol, safeInterval]);

    return (
        <div className="w-full h-full flex flex-col overflow-hidden">

            {/* CHART */}
            <div ref={containerRef} className="w-full flex-1" />

            {/* TIMEFRAME BAR */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-200 bg-white">

                {intervals.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => setInterval(item.value as Interval)}
                        className={`text-xs font-medium px-2 py-1 rounded-md transition-all duration-200
                        ${interval === item.value
                                ? "bg-[#2e86fe] text-white"
                                : "text-zinc-500 hover:text-black"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}

            </div>
        </div>
    );
}

export default memo(TradingViewChart);