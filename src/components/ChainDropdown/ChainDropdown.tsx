// src/components/ChainDropdown.tsx
import React from 'react';
import styles from './ChainDropdown.module.css'; // Import the styles object from the appropriate file

const ChainDropdown: React.FC = () => {
  return (
    <div className={styles.dropdown}>
      <input type="checkbox" id="ethereum" className={styles.checkbox} />
      <label htmlFor="ethereum">Ethereum</label>
      <input type="checkbox" id="arbitrum" className={styles.checkbox} />
      <label htmlFor="arbitrum">Arbitrum</label>
      <input type="checkbox" id="starknet" className={styles.checkbox} />
      <label htmlFor="starknet">Starknet</label>
      <input type="checkbox" id="base" className={styles.checkbox} />
      <label htmlFor="base">Base</label>
      <input type="checkbox" id="scroll" className={styles.checkbox} />
      <label htmlFor="scroll">Scroll</label>
      <input type="checkbox" id="zksync" className={styles.checkbox} />
      <label htmlFor="zksync">zkSync</label>
    </div>
  );
};

export default ChainDropdown;
