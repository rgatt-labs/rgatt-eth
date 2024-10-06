import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import { ConnectButton, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";
import { sepolia, arbitrumSepolia, optimismSepolia, baseSepolia } from 'thirdweb/chains';
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: "2f21db6159acb63222030de940b8ce82",
});

const supportedChains = [sepolia, arbitrumSepolia, optimismSepolia, baseSepolia];

const Header: React.FC = () => {
  const [vaultTooltipVisible, setVaultTooltipVisible] = useState(false);
  const [dashboardTooltipVisible, setDashboardTooltipVisible] = useState(false);
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleChangeChain = (chainId: number) => {
    const selectedChain = supportedChains.find(chain => chain.id === chainId);
    if (selectedChain) {
      switchChain(selectedChain).catch((error) => console.error(error));
      setDropdownVisible(false); // Ferme le menu déroulant après la sélection
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/app" passHref legacyBehavior>
            <a>
              <Image src="/r.png" alt="Logo" width={75} height={75} />
            </a>
          </Link>
        </div>
        <nav className={styles.nav}>
          <div className={styles.leftNav}>
            <span
              className={styles.vaults}
              onMouseEnter={() => setVaultTooltipVisible(true)}
              onMouseLeave={() => setVaultTooltipVisible(false)}
            >
              Vaults
            </span>
            {vaultTooltipVisible && <div className={styles.tooltip}>Under Construction</div>}
            <span
              className={styles.dashboard}
              onMouseEnter={() => setDashboardTooltipVisible(true)}
              onMouseLeave={() => setDashboardTooltipVisible(false)}
            >
              Dashboard
            </span>
            {dashboardTooltipVisible && <div className={styles.tooltip}>Under Construction</div>}
          </div>
          <div className={styles.rightNav}>
            <div className={styles.chainSelector}>
              <button 
                className={styles.selectedChain} 
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                {activeChain?.name || 'Select Chain'}
              </button>
              {dropdownVisible && (
                <div className={styles.dropdown}>
                  {supportedChains.map((chain) => (
                    <button
                      key={chain.id}
                      className={styles.chainOption}
                      onClick={() => handleChangeChain(chain.id)}
                    >
                      {chain.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <ConnectButton
              theme={"light"}
              connectModal={{ size: "wide", title: "Rgatt" }}
              client={client}
            />
          </div>
        </nav>
      </div>
      <div className={styles.headerDivider}></div>
    </header>
  );
};

export default Header;
