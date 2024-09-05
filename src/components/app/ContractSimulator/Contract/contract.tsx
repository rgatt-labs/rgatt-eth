import React, { useState } from 'react';
import styles from './Contract.module.css';
import ContractPopup from '../../ContractPopup/ContractPopup';
import VehicleForm from '../../Forms/VehicleForm';
import RealEstateForm from '../../Forms/RealEstateForm';
import HealthForm from '../../Forms/HealthForm';

const Contract = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSelectContract = (contract: any) => {
    setSelectedContract(contract);
  };

  const renderForm = () => {
    switch (selectedContract?.name) {
      case 'Vehicle':
        return <VehicleForm />;
      case 'Real Estate':
        return <RealEstateForm />;
      case 'Health':
        return <HealthForm />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftContent}>
        {selectedContract ? (
          <div className={styles.formContainer}>
            {renderForm()}
          </div>
        ) : (
          <>
            <h1 className={styles.mainTitle}>Welcome to a new era</h1>
            <h2 className={styles.subTitle}>
              Protect yourself more easily
              <br />
              than ever before with the only
              <br />
              Digital Assurance Protocol
            </h2>
            <p className={styles.getStarted}>Get started with our simulator</p>
            <button className={styles.createContractButton} onClick={handleOpenPopup}>+ Create your contract</button>
          </>
        )}
      </div>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h1 className={styles.title}>Simulation Details</h1>
          <button className={styles.button} onClick={handleOpenPopup}>+ Create your contract</button>
          <p className={styles.description}>
            Details of contract added to your estimate are displayed in this panel
          </p>
        </div>
        <div className={styles.estimatedCostContainer}>
          <div className={styles.estimatedCost}>
            <span>ESTIMATED COST</span>
            <span>--/mo</span>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.visualizeButton} disabled>
              Visualize
            </button>
            <button className={styles.subscribeButton}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <ContractPopup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup}
        onSelectContract={handleSelectContract}
      />
    </div>
  );
};

export default Contract;
