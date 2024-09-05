import React, { useState } from 'react';
import styles from './ContractPopup.module.css';

const ContractPopup = ({ isOpen, onClose, onSelectContract }: { isOpen: boolean, onClose: () => void, onSelectContract: (contract: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const contractItems = [
    { 
      name: 'Vehicle', 
      description: 'Comprehensive auto insurance offering coverage for damages, thefts, and liabilities, tailored to your everyday needs.' 
    },
    { 
      name: 'Real Estate', 
      description: 'Real estate protection plan that covers your home or apartment against risks such as fires, floods, and other major disasters, providing total peace of mind.' 
    },
    { 
      name: 'Health', 
      description: 'Personalized health insurance solution, covering your medical care, hospitalizations, and treatments, for you and your family.' 
    },
  ];
  
  const filteredItems = contractItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Contract Simulator</h2>
        <input
          type="text"
          placeholder="Search by contract type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.contractList}>
          {filteredItems.map((item, index) => (
            <div key={index} className={styles.contractItem}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button onClick={() => {
                onSelectContract(item);
                onClose();
              }}>
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractPopup;
