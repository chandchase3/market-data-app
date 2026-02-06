import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKrakenScannerList, setScannerList } from "../../market/cryptoSlice";
import styles from "./ScannerAdd.module.css";

const ScannerAdd = () => {
  const dispatch = useDispatch();
  const scannerList = useSelector(getKrakenScannerList);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    let formatted = input.trim().toUpperCase();
    if (!formatted.includes("/")) {
      formatted = `${formatted}/USD`;
    }

    if (scannerList.includes(formatted)) {
      setInput("");
      return;
    }

    dispatch(setScannerList([...scannerList, formatted]));
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={input}
        placeholder="Add coins..."
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown} // <-- triggers handleAdd on Enter
        className={styles.input}
      />
      <button onClick={handleAdd} className={styles.button}>
        Add
      </button>
    </div>
  );
};

export default ScannerAdd;
