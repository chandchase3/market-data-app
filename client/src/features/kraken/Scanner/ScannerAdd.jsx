import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKrakenScannerList, setScannerList } from '../../market/cryptoSlice';

const ScannerAdd = () => {
  const dispatch = useDispatch();
  const scannerList = useSelector(getKrakenScannerList);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return; // ignore empty

    // VERIFY FORMAT: "BTC/USD"
    let formatted = input.trim().toUpperCase();
    if (!formatted.includes('/')) {
      formatted = `${formatted}/USD`; // auto append /USD
    }

    // AVOID DUPLICATES
    if (scannerList.includes(formatted)) {
      setInput('');
      return;
    }

    // ADD TO REDUX
    dispatch(setScannerList([...scannerList, formatted]));
    setInput('');
  };

  return (
    <div style={{ margin: '10px 0' }}>
      <input
        type="text"
        value={input}
        placeholder="Enter pair (e.g., BTC/USD)"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd} style={{ marginLeft: '5px' }}>
        Add
      </button>
    </div>
  );
};

export default ScannerAdd;
