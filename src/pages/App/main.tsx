// src/pages/dAppHome.tsx
import React from 'react';
import styles from './Header.module.css';
import ChainDropdown from '@/components/ChainDropdown/ChainDropdown';

const DAppHome: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>rgatt</div>
        <nav className={styles.nav}>
          <div className={styles.vaultsExplorer}>Vaults Explorer</div>
          <input type="text" placeholder="Search..." className={styles.searchBar} />
          <div className={styles.dashboard}>Dashboard</div>
          <ChainDropdown />
          <div className={styles.connectButton}>Connect</div>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.vaultSection}>
          <div className={styles.vault}>
            <h2>Vehicle Vault</h2>
            <p>explication...</p>
            <button className={styles.assetsButton}>Assets</button>
            <button className={styles.chainButton}>Chain</button>
            <p>TVL $XXX.XXX.XXX</p>
            <button className={styles.simulateButton}>SIMULATE</button>
          </div>
          <div className={styles.vault}>
            <h2>Property Vault</h2>
          </div>
          <div className={styles.vault}>
            <h2>Technology Item Vault</h2>
          </div>
          <div className={styles.vault}>
            <h2>Travel Insurance</h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DAppHome;
