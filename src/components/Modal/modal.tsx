import React, { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAccount, useSwitchChain, useBalance, useConfig } from 'wagmi';

const Vaults: React.FC = () => {
  const router = useRouter();
  const { address, chain } = useAccount();
  const { switchChain, chains } = useSwitchChain();
  const { data: balanceData } = useBalance({ address }); // Assurez-vous que useBalance retourne les données correctes

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChain, setSelectedChain] = useState('ethereum'); // Assurez-vous que 'ethereum.png' existe dans public/icons
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [showVaults, setShowVaults] = useState(false);
  const [selectedVault, setSelectedVault] = useState<string | null>(null); // Pour mémoriser le vault sélectionné
  const [amount, setAmount] = useState('');

  const vaultData = [
    { title: 'Vehicle Insurance', keywords: ['car', 'bike', 'vehicle'] },
    { title: 'Property Insurance', keywords: ['house', 'property'] },
    { title: 'Technology Item Insurance', keywords: ['laptop', 'tech'] },
    { title: 'Travel Insurance', keywords: ['trip', 'vacation'] },
    { title: 'Health Insurance', keywords: ['health', 'medical'] },
    { title: 'Pet Insurance', keywords: ['pet', 'animal'] },
  ];

  useEffect(() => {
    if (chain && chain.name !== selectedChain) {
      const targetChain = chains.find(c => c.name === selectedChain);
      if (targetChain) {
        switchChain({ chainId: targetChain.id });
      }
    }
  }, [selectedChain]);

  const handleSimulate = (vaultTitle: string) => {
    setSelectedVault(vaultTitle);
    setShowVaults(false); // Ferme la liste des résultats des Vaults
  };

  const handleSubmit = () => {
    // Logique pour effectuer le transfert vers le Vault sélectionné
    console.log(`Sending ${amount} ${selectedAsset} on ${selectedChain}`);
    // Ajoutez ici la logique pour effectuer le transfert réel
  };

  // Fonction pour fermer la liste des résultats des Vaults
  const closeVaults = () => {
    setShowVaults(false);
  };

  // Utilisation de localStorage pour mémoriser et restaurer la sélection de Vault
  useEffect(() => {
    const storedVault = localStorage.getItem('selectedVault');
    if (storedVault) {
      setSelectedVault(storedVault);
    }
  }, []);

  useEffect(() => {
    if (selectedVault) {
      localStorage.setItem('selectedVault', selectedVault);
    }
  }, [selectedVault]);

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2>Rgatt Simulator</h2>
      </div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for vault..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={() => setShowVaults(true)}
        />
      </div>
      {showVaults && (
        <div className={styles.vaultResults}>
          {vaultData
            .filter(vault =>
              vault.keywords.some(keyword =>
                keyword.includes(searchQuery.toLowerCase())
              )
            )
            .map((vault, index) => (
              <div
                key={index}
                className={styles.vaultResult}
                onClick={() => handleSimulate(vault.title)}
              >
                {vault.title}
              </div>
            ))}
          <button className={styles.closeButton} onClick={closeVaults}>
            Close
          </button>
        </div>
      )}
      {selectedVault && (
        <div className={styles.selectedVault}>
          <h3>Selected Vault: {selectedVault}</h3>
          {/* Affichez ici les détails du Vault sélectionné */}
        </div>
      )}
      <div className={styles.selector}>
        <div className={styles.dropdownWrapper}>
          <button className={styles.dropdownButton}>
            <Image
              src={`/icons/${selectedChain.toLowerCase()}.png`}
              alt={selectedChain}
              width={20}
              height={20}
            />
            {selectedChain}
            <span className={styles.arrowDown}>&#9662;</span>
          </button>
          <div className={styles.dropdownContent}>
            {chains.map(chain => (
              <div
                key={chain.id}
                onClick={() => setSelectedChain(chain.name)}
                className={styles.dropdownItem}
              >
                <Image
                  src={`/icons/${chain.name.toLowerCase()}.png`}
                  alt={chain.name}
                  width={20}
                  height={20}
                />
                {chain.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.dropdownWrapper}>
          <button className={styles.dropdownButton}>
            <Image
              src={`/icons/${selectedAsset.toLowerCase()}.png`}
              alt={selectedAsset}
              width={20}
              height={20}
            />
            {selectedAsset}
            <span className={styles.arrowDown}>&#9662;</span>
          </button>
          <div className={styles.dropdownContent}>
            {['ETH', 'USDT', 'USDC', 'DAI'].map(asset => (
              <div
                key={asset}
                onClick={() => setSelectedAsset(asset)}
                className={styles.dropdownItem}
              >
                <Image
                  src={`/icons/${asset.toLowerCase()}.png`}
                  alt={asset}
                  width={20}
                  height={20}
                />
                {asset}
              </div>
            ))}
          </div>
        </div>
      </div>
       {/* Affichage de la balance au-dessus de l'input Enter amount */}
       <div className={styles.balance}>
        Balance: {balanceData ? balanceData.formatted : 'Loading...'}
      </div>
      <br></br>
      <div className={styles.amountInput}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button className={styles.simulateButton} onClick={handleSubmit}>
        SEND
      </button>
      <div className={styles.footer}>
        <p>Powered by Rgatt-Labs</p>
      </div>
    </div>
  );
};

export default Vaults;
