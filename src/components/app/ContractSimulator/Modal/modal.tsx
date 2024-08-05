import React, { useState, useEffect } from 'react';
import { useAccount, useSwitchChain, useBalance } from 'wagmi';
import { ethers } from 'ethers';
import styles from './Modal.module.css';

const vaults = [
  { name: 'Vehicle', keywords: ['moto', 'car', 'vehicle'] },
  { name: 'Real Estate', keywords: ['apartment', 'house', 'building'] },
  { name: 'Health Care', keywords: ['health', 'medical'] },
  { name: 'Trip', keywords: ['travel', 'vacation'] },
  { name: 'Life Insurance', keywords: ['life'] },
];

const formQuestions = {
  'Vehicle': [
    { question: 'Type of Vehicle', options: ['Motorcycle', 'Car', 'Truck'] },
    { question: 'Age of Vehicle', options: ['< 1 year', '1-5 years', '> 5 years'] },
    { question: 'Usage', options: ['Personal', 'Professional'] },
  ],
  'Real Estate': [
    { question: 'Type of Property', options: ['Apartment', 'House', 'Building'] },
    { question: 'Area', options: ['< 50m²', '50-100m²', '> 100m²'] },
    { question: 'Location', options: ['City', 'Suburb', 'Countryside'] },
  ],
  'Health Care': [
    { question: 'Type of Coverage', options: ['Basic', 'Standard', 'Premium'] },
    { question: 'Age', options: ['18-30', '31-50', '51+'] },
    { question: 'Medical History', options: ['None', 'Minor', 'Major'] },
  ],
  'Trip': [
    { question: 'Duration of Trip', options: ['< 1 week', '1-2 weeks', '> 2 weeks'] },
    { question: 'Destination', options: ['Europe', 'America', 'Asia', 'Other'] },
    { question: 'Type of Trip', options: ['Leisure', 'Business', 'Mixed'] },
  ],
  'Life Insurance': [
    { question: 'Age', options: ['18-30', '31-50', '51+'] },
    { question: 'Profession', options: ['Low risk', 'Medium risk', 'High risk'] },
    { question: 'Coverage Amount', options: ['< 100k', '100k-500k', '> 500k'] },
  ],
};

const assets = [
  { symbol: 'ETH', logo: '/icons/eth.png' },
  { symbol: 'USDT', logo: '/icons/usdt.png' },
  { symbol: 'USDC', logo: '/icons/usdc.png' },
  { symbol: 'DAI', logo: '/icons/dai.png' },
];

const chains = [
  { name: 'Ethereum', logo: '/icons/mainnet.png', id: 1 },
  { name: 'Arbitrum', logo: '/icons/arbitrum.png', id: 42161 },
  { name: 'Base', logo: '/icons/base.png', id: 8453 },
  { name: 'Optimism', logo: '/icons/optimism.png', id: 10 },
];

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
const CONTRACT_ABI = [
  "function subscribe(address user, uint256 amount) external",
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

  useEffect(() => {
    if (selectedVault) {
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setShowSubscribeButton(false);
    }
  }, [selectedVault]);

  const handleVaultSelect = (vault: string) => {
    setSelectedVault(vault);
    setShowVaultModal(false);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < formQuestions[selectedVault as keyof typeof formQuestions].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowSubscribeButton(true);
    }
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const amount = Math.random() * (0.009 - 0.001) + 0.001;
      setSimulatedAmount(parseFloat(amount.toFixed(3))); // Adjusted for ETH and limited to 3 decimal places
      setIsSimulating(false);
    }, 2000);
  };

  // const handleSubscribe = async () => {
  //   if (!address || !simulatedAmount) return;

  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  //     const tx = await contract.subscribe(address, ethers.utils.parseEther(simulatedAmount.toString()));
  //     console.log('Transaction sent:', tx.hash);
  //     await tx.wait();
  //     console.log('Transaction confirmed:', tx.hash);
  //   } catch (error) {
  //     console.error('Error subscribing:', error);
  //   }
  // };

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
                  <img src={asset.logo} alt={asset.symbol} className={styles.logo} />
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
                  <img src={chain.logo} alt={chain.name} className={styles.logo} />
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
            Here is the amount of your contract: {simulatedAmount} ETH
            {showSubscribeButton && (
              <button className={styles.subscribeButton}> 
              {/* // onClick={handleSubscribe} */}
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
