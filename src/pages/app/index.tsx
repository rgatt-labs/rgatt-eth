// pages/index.tsx
import React from 'react';
import styles from './App.module.css';
import Contract from '@/components/app/ContractSimulator/Contract/contract';
import Header from '@/components/app/AppHeader/header';

const App: React.FC = () => {
  return (
    <div className={styles.dapp}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Contract />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
