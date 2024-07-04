// pages/index.tsx
import React from 'react';
import styles from './App.module.css';
import Vault from '@/components/Vaults/vaults';
import Header from '@/components/Header/header';

const App: React.FC = () => {
  return (
    <div className={styles.dapp}>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <Vault />
        </main>
      </div>
    </div>
  );
};

export default App;
