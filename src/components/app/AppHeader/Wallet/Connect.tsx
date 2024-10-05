import React, { useState, useRef, useEffect } from 'react';
import { Connector, useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import Image from 'next/image';
import styles from './Connect.module.css';

// Logos pour les chaînes supportées
const chainLogos: { [key: number]: string } = {
  1: '/eth.png',
  11155111: '/eth.png',
  421614: '/arbitrum.png',
  84532: '/base.png',
  11155420: '/optimism.png',
};

// Liens vers les explorateurs de blocs
const chainScans: { [key: number]: string } = {
  1: 'https://etherscan.io/',
  11155111: 'https://sepolia.etherscan.io/',
  421614: 'https://sepolia.arbiscan.io/',
  84532: 'https://sepolia.basescan.org/',
  11155420: 'https://sepolia-optimism.etherscan.io/',
};

const supportedChains = [
  { id: 11155111, name: 'Ethereum Sepolia' },
  { id: 421614, name: 'Arbitrum Sepolia' },
  { id: 84532, name: 'Base Sepolia' },
  { id: 11155420, name: 'OP Sepolia' },
];

function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isChainSelectorOpen, setIsChainSelectorOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const disconnectRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConnect = (connector: Connector) => {
    connect({ connector });
    setIsWalletOpen(false);
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedAddress = address
    ? `${address.slice(0, 4)}...${address.slice(-2)}`
    : '';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (disconnectRef.current && !disconnectRef.current.contains(event.target as Node)) {
        setIsDisconnectModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.walletConnect}>
      <div className={styles.buttonGroup}>
        {isConnected && (
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
                <span>{supportedChains.find(c => c.id === chain.id)?.name}</span>
              </>
            ) : null}
          </button>
        )}
        <button
          onClick={() => isConnected ? setIsDisconnectModalOpen(true) : setIsWalletOpen(true)}
          className={styles.walletButton}
        >
          {isConnected ? `${formattedAddress} | ${balance?.formatted.slice(0, 6)} ${balance?.symbol}` : 'Connect Wallet'}
        </button>
      </div>

      {isChainSelectorOpen && (
        <div className={`${styles.dropdown} ${styles.dropdownAnimate}`}>
          {supportedChains.map((supportedChain) => (
            <button
              key={supportedChain.id}
              onClick={async () => {
                if (switchChain) {
                  try {
                    await switchChain({ chainId: supportedChain.id });
                    setIsChainSelectorOpen(false);
                  } catch (error) {
                    console.error("Failed to switch chain", error);
                  }
                } else {
                  console.error("switchChain is not available");
                }
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
        <div className={styles.modalOverlay} onClick={() => setIsWalletOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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

      {isDisconnectModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsDisconnectModalOpen(false)}>
          <div className={styles.modalContent} ref={disconnectRef} onClick={(e) => e.stopPropagation()}>
            <h2>{copied ? 'Address copied!' : 'Connected!'}</h2>
            <p>{formattedAddress}</p>
            <button onClick={handleCopyAddress} className={styles.walletOption}>
              Copy Address
            </button>
            <button
              onClick={() => {
                if (chain?.id) {
                  window.open(chainScans[chain.id], '_blank');
                }
                setIsDisconnectModalOpen(false);
              }}
              className={styles.walletOption}
            >
              {chain?.id
                ? `View on ${supportedChains.find(c => c.id === chain.id)?.name} Scan`
                : 'View on Scan'}
            </button>
            <button
              onClick={() => {
                disconnect();
                setIsDisconnectModalOpen(false);
              }}
              className={styles.walletOption}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
