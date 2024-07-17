import React, { useState } from 'react';
import { useAccount, useSwitchChain, useBalance } from 'wagmi';
import styles from './Modal.module.css';

const vaults = [
  { name: 'Vehicle', keywords: ['moto', 'voiture', 'véhicule'] },
  { name: 'Real Estate', keywords: ['appartement', 'maison', 'immeuble'] },
  { name: 'Health Care', keywords: ['santé', 'médical'] },
  { name: 'Trip', keywords: ['voyage', 'vacances'] },
  { name: 'Life Insurance', keywords: ['vie'] },
];

const formQuestions = {
  'Vehicle': [
    { question: 'Type de véhicule', options: ['Moto', 'Voiture', 'Camion'] },
    { question: 'Âge du véhicule', options: ['< 1 an', '1-5 ans', '> 5 ans'] },
    { question: 'Utilisation', options: ['Personnelle', 'Professionnelle'] },
  ],
  'Real Estate': [
    { question: 'Type de bien', options: ['Appartement', 'Maison', 'Immeuble'] },
    { question: 'Surface', options: ['< 50m²', '50-100m²', '> 100m²'] },
    { question: 'Localisation', options: ['Ville', 'Banlieue', 'Campagne'] },
  ],
  'Health Care': [
    { question: 'Type de couverture', options: ['Basique', 'Standard', 'Premium'] },
    { question: 'Âge', options: ['18-30', '31-50', '51+'] },
    { question: 'Antécédents médicaux', options: ['Aucun', 'Mineurs', 'Majeurs'] },
  ],
  'Trip': [
    { question: 'Durée du voyage', options: ['< 1 semaine', '1-2 semaines', '> 2 semaines'] },
    { question: 'Destination', options: ['Europe', 'Amérique', 'Asie', 'Autre'] },
    { question: 'Type de voyage', options: ['Loisirs', 'Affaires', 'Mixte'] },
  ],
  'Life Insurance': [
    { question: 'Âge', options: ['18-30', '31-50', '51+'] },
    { question: 'Profession', options: ['Faible risque', 'Risque moyen', 'Risque élevé'] },
    { question: 'Montant de couverture', options: ['< 100k€', '100k-500k€', '> 500k€'] },
  ],
};

const assets = [
  { symbol: 'ETH', logo: 'path_to_eth_logo.png' },
  { symbol: 'USDT', logo: 'path_to_usdt_logo.png' },
  { symbol: 'USDC', logo: 'path_to_usdc_logo.png' },
  { symbol: 'DAI', logo: 'path_to_dai_logo.png' },
];

const chains = [
  { name: 'Ethereum', logo: 'path_to_ethereum_logo.png', id: 1 },
  { name: 'Arbitrum', logo: 'path_to_arbitrum_logo.png', id: 42161 },
  { name: 'Base', logo: 'path_to_base_logo.png', id: 8453 },
  { name: 'Optimism', logo: 'path_to_optimism_logo.png', id: 10 },
];

const Modal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [selectedVault, setSelectedVault] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState('ETH');
  const [selectedChain, setSelectedChain] = useState('Ethereum');
  const [simulatedAmount, setSimulatedAmount] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSubscribeButton, setShowSubscribeButton] = useState(false);

  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: balanceData } = useBalance({ address });

  const handleVaultSelect = (vault: string) => {
    setSelectedVault(vault);
    setShowVaultModal(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentQuestionIndex < formQuestions[selectedVault as keyof typeof formQuestions].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Formulaire complété
      console.log("Formulaire complété :", newAnswers);
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const amount = Math.floor(Math.random() * (100 - 50 + 1) + 50);
      setSimulatedAmount(amount);
      setIsSimulating(false);
      setShowSubscribeButton(true);
    }, 2000);
  };

  const handleSubscribe = () => {
    // Logique pour lancer le smart contract de débit
    console.log('Lancement du smart contract de débit');
  };

  const handleChainChange = (chain: string) => {
    setSelectedChain(chain);
    const selectedChainObj = chains.find(c => c.name === chain);
    if (selectedChainObj) {
      switchChain?.({ chainId: selectedChainObj.id });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Rgatt Simulator</h1>
        
        <div className={styles.searchBarContainer}>
          <input
            className={styles.searchBar}
            placeholder="Select a vault..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowVaultModal(true)}
          />
          {showVaultModal && (
            <div className={styles.vaultModal}>
              {vaults.map((vault, index) => (
                <div key={index} className={styles.vaultOption} onClick={() => handleVaultSelect(vault.name)}>
                  {vault.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.vaultInfo}>
          <div>{selectedVault || 'Selected Vault...'}</div>
          <div>TVL: {balanceData ? `${balanceData.formatted} ${balanceData.symbol}` : 'Loading...'}</div>
        </div>

        <div className={styles.formContainer}>
          {selectedVault && currentQuestionIndex < formQuestions[selectedVault as keyof typeof formQuestions].length && (
            <div className={styles.question}>
              <p>{formQuestions[selectedVault as keyof typeof formQuestions][currentQuestionIndex].question}</p>
              <div className={styles.options}>
                {formQuestions[selectedVault as keyof typeof formQuestions][currentQuestionIndex].options.map((option, index) => (
                  <button key={index} className={styles.optionButton} onClick={() => handleAnswer(option)}>{option}</button>
                ))}
              </div>
            </div>
          )}
          {selectedVault && currentQuestionIndex >= formQuestions[selectedVault as keyof typeof formQuestions].length && (
            <div className={styles.formCompleted}>
              Form completed! You can now proceed to simulation.
            </div>
          )}
        </div>

        <div className={styles.selectors}>
          <div className={styles.customSelect}>
            <select 
              className={styles.assetSelector} 
              value={selectedAsset} 
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              {assets.map((asset, index) => (
                <option key={index} value={asset.symbol}>
                  {asset.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.customSelect}>
            <select 
              className={styles.chainSelector} 
              value={selectedChain} 
              onChange={(e) => handleChainChange(e.target.value)}
            >
              {chains.map((chain, index) => (
                <option key={index} value={chain.name}>
                  {chain.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!simulatedAmount && (
          <button className={styles.simulateButton} onClick={handleSimulate} disabled={isSimulating}>
            {isSimulating ? 'Simulating...' : 'Simulate'}
          </button>
        )}

        {simulatedAmount !== null && (
          <div className={styles.simulationResult}>
            Here is the amount of your contract: ${simulatedAmount}
            {showSubscribeButton && (
              <button className={styles.subscribeButton} onClick={handleSubscribe}>
                Subscribe
              </button>
            )}
          </div>
        )}

        <div className={styles.footer}>
          Powered by Rgatt Labs
        </div>
      </div>
    </div>
  );
};

export default Modal;