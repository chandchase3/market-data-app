import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getKrakenScannerList, setScannerList } from '../../market/cryptoSlice';
import ScannerCoin from './ScannerCoin';
import ScannerAdd from './ScannerAdd';

const ScannerControls = () => {
  const dispatch = useDispatch();
  const scannerList = useSelector(getKrakenScannerList);

  const handleRemove = (itemToRemove) => {
    dispatch(setScannerList(scannerList.filter(item => item !== itemToRemove)));
  };

  return (
    <div>
      <ScannerAdd />

      {/* {scannerList.map((item, index) => (
        <ScannerCoin 
          key={item + index} 
          item={item} 
          onRemove={() => handleRemove(item)} 
        />
      ))} */}
    </div>
  );
};

export default ScannerControls;
