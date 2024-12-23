import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import ConnectWallet from './Wallet/Connect';

const Header: React.FC = () => {
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
            <Link href="/vault" passHref legacyBehavior>
              <a className={styles.vaults}>Vaults</a>
            </Link>
            <Link href="/explorer" passHref legacyBehavior>
              <a className={styles.explorer}>Explorer</a>
            </Link>
            <Link href="/dashboard" passHref legacyBehavior>
              <a className={styles.dashboard}>Dashboard</a>
            </Link>
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