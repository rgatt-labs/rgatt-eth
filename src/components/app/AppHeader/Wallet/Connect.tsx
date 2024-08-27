import React, { useState, useRef, useEffect } from 'react';
import { Connector, useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import Image from 'next/image';
import styles from './Connect.module.css';

// Logos pour les chaînes supportées
const chainLogos: { [key: number]: string } = {
  1: '/eth.png', // Logo Ethereum
  11155111: '/eth.png', // Logo Sepolia
  42161: '/arbitrum.png', // Logo Arbitrum
  8453: '/base.png', // Logo Base
  10: '/optimism.png', // Logo Optimism
};

const supportedChains = [
  { id: 1, name: 'Ethereum' },
  { id: 11155111, name: 'Sepolia' },
  { id: 42161, name: 'Arbitrum One' },
  { id: 8453, name: 'Base' },
  { id: 10, name: 'Optimism' },
];

function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isChainSelectorOpen, setIsChainSelectorOpen] = useState(false);
  const [isDisconnectSlideVisible, setIsDisconnectSlideVisible] = useState(false);
  const disconnectRef = useRef(null);

  const handleConnect = (connector: Connector) => {
    connect({ connector });
    setIsWalletOpen(false);
  };

  const handleDisconnect = () => {
    setIsDisconnectSlideVisible(true);
    setTimeout(() => {
      disconnect();
      setIsDisconnectSlideVisible(false);
    }, 300); // Durée de l'animation de slide
  };

  const formattedAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-2)}`
    : '';

  useEffect(() => {
    function handleClickOutside(event: { target: any; }) {
      if (disconnectRef.current && (disconnectRef.current as HTMLElement).contains(event.target)) {
        setIsDisconnectSlideVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.walletConnect}>
      <div className={styles.buttonGroup}>
        <button
          onClick={() => setIsChainSelectorOpen(!isChainSelectorOpen)}
          className={styles.chainButton}
        >
          {chain && chainLogos[chain.id] ? (
            <>
              <Image
                src={chainLogos[chain.id]}
                alt={chain?.name || 'Chain'}
                width={24}
                height={24}
              />
              <span className={styles.chainName}>{supportedChains.find(c => c.id === chain.id)?.name}</span>
            </>
          ) : null}
        </button>
        <button
          onClick={() => setIsWalletOpen(!isWalletOpen)}
          className={styles.walletButton}
        >
          {formattedAddress} | {balance?.formatted.slice(0, 6)} {balance?.symbol}
        </button>
      </div>

      {isChainSelectorOpen && (
        <div className={`${styles.dropdown} ${styles.dropdownAnimate}`}>
          {supportedChains.map((supportedChain) => (
            <button
              key={supportedChain.id}
              onClick={() => {
                switchChain?.({ chainId: supportedChain.id });
                setIsChainSelectorOpen(false);
              }}
              className={`${styles.dropdownItem} ${
                chain?.id === supportedChain.id ? styles.active : ''
              }`}
            >
              <Image
                src={chainLogos[supportedChain.id]}
                alt={supportedChain.name}
                width={20}
                height={20}
                className={styles.chainLogo}
              />
              {supportedChain.name}
            </button>
          ))}
        </div>
      )}

      {isWalletOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button onClick={() => setIsWalletOpen(false)} className={styles.closeButton}>
              X
            </button>
            <h2>Log in or sign up</h2>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                className={styles.walletOption}
              >
                {connector.name}
              </button>
            ))}
            <div className={styles.extraOptions}>
              <button className={styles.otherWallets}>Other wallets</button>
              <button className={styles.continueWithEmail}>Continue with email</button>
            </div>
            <p className={styles.terms}>
              By logging in I agree to the <a href="#">Terms & Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}

      {isDisconnectSlideVisible && (
        <div className={`${styles.disconnectSlide} ${isDisconnectSlideVisible ? styles.show : ''}`} ref={disconnectRef}>
          <button
            onClick={handleDisconnect}
            className={styles.disconnectButton}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
