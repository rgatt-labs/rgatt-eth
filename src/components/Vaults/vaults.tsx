import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Vaults.module.css';
import Image from 'next/image';

const Vaults: React.FC = () => {
  const router = useRouter();

  const vaultData = [
    { title: 'Vehicle Insurance', description: 'Insurance for cars, motorcycles, and other vehicles.', tvl: '$XXX.XXX.XXX' },
    { title: 'Property Insurance', description: 'Insurance for residential and commercial properties.', tvl: '$XXX.XXX.XXX' },
    { title: 'Technology Item Insurance', description: 'Coverage for laptops, smartphones, and other tech items.', tvl: '$XXX.XXX.XXX' },
    { title: 'Travel Insurance', description: 'Insurance for trips and vacations.', tvl: '$XXX.XXX.XXX' },
    { title: 'Health Insurance', description: 'Medical insurance for individuals and families.', tvl: '$XXX.XXX.XXX' },
    { title: 'Pet Insurance', description: 'Coverage for your pets\' health and medical needs.', tvl: '$XXX.XXX.XXX' },
  ];

  const [selectedChain, setSelectedChain] = useState('Ethereum');
  const [selectedAsset, setSelectedAsset] = useState('ETH');

  const handleSimulate = (vaultTitle: string) => {
    router.push(`/simulate/${vaultTitle.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <section className={styles.vaultSection}>
      <div className={styles.vaultGrid}>
        {vaultData.map((vault, index) => (
          <div key={index} className={styles.vault}>
            <h2>{vault.title}</h2>
            <p>{vault.description}</p>
            <div className={styles.dropdownWrapper}>
              <button className={styles.dropdownButton}>
                <Image src={`/icons/${selectedChain.toLowerCase()}.png`} alt={selectedChain} width={20} height={20} />
                {selectedChain}
                <span className={styles.arrowDown}>&#9662;</span>
              </button>
              <div className={styles.dropdownContent}>
                {['Ethereum', 'Arbitrum', 'Starknet', 'Base', 'Scroll', 'Zksync'].map((chain) => (
                  <div key={chain} onClick={() => setSelectedChain(chain)} className={styles.dropdownItem}>
                    <Image src={`/icons/${chain.toLowerCase()}.png`} alt={chain} width={20} height={20} />
                    {chain}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.dropdownWrapper}>
              <button className={styles.dropdownButton}>
                <Image src={`/icons/${selectedAsset.toLowerCase()}.png`} alt={selectedAsset} width={20} height={20} />
                {selectedAsset}
                <span className={styles.arrowDown}>&#9662;</span>
              </button>
              <div className={styles.dropdownContent}>
                {['ETH', 'USDT', 'USDC', 'DAI'].map((asset) => (
                  <div key={asset} onClick={() => setSelectedAsset(asset)} className={styles.dropdownItem}>
                    <Image src={`/icons/${asset.toLowerCase()}.png`} alt={asset} width={20} height={20} />
                    {asset}
                  </div>
                ))}
              </div>
            </div>
            <p>TVL {vault.tvl}</p>
            <button 
              className={styles.simulateButton}
              onClick={() => handleSimulate(vault.title)}
            >
              SIMULATE
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vaults;
