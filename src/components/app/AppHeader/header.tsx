import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import ConnectWallet from './Wallet/Connect';

const Header: React.FC = () => {
  const [vaultTooltipVisible, setVaultTooltipVisible] = useState(false);
  const [dashboardTooltipVisible, setDashboardTooltipVisible] = useState(false);

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
            <ConnectWallet />
          </div>
        </nav>
      </div>
      <div className={styles.headerDivider}></div>
    </header>
  );
};

export default Header;
