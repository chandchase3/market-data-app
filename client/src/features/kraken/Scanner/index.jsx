// src/features/kraken/Scanner.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getKrakenScannerList } from "../../market/cryptoSlice";
import ScannerControls from "./ScannerControls";
import ScannerItem from "./ScannerItem";

const Scanner = () => {
  const scannerList = useSelector(getKrakenScannerList); // array of pair strings
  const [connected, setConnected] = useState(false);
  const [scanData, setPrices] = useState({}); // raw ticker data

  useEffect(() => {
    if (!scannerList || scannerList.length === 0) return;

    const ws = new WebSocket("wss://ws.kraken.com");

    ws.onopen = () => {
      console.log("Connected to Kraken WS");
      setConnected(true);

      // Map base symbols for Kraken
      const krakenPairMap = { BTC: "XBT", ETH: "ETH", SOL: "SOL" };
      const krakenPairs = scannerList.map(p => {
        const [base, quote] = p.split("/");
        return `${krakenPairMap[base] || base}/${quote}`;
      });

      ws.send(JSON.stringify({
        event: "subscribe",
        pair: krakenPairs,
        subscription: { name: "ticker" }
      }));

      console.log("Subscribed to pairs:", krakenPairs);
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      // Only save if it's an array (ticker update)
      if (Array.isArray(data)) {
        const pair = data[3];
        setPrices(prev => ({ ...prev, [pair]: data }));
      }
    };

    ws.onclose = () => {
      console.log("Disconnected");
      setConnected(false);
    };

    ws.onerror = (err) => console.error("WS error:", err);

    return () => ws.close();
  }, [scannerList]);

  return (
    <div>
      <ScannerControls />
      <ScannerItem scanData={scanData} />
    </div>
  );
};

export default Scanner;
