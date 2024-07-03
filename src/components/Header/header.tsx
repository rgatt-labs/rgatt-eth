// components/Header/Header.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import ConnectButton from '../walletConnect/connectButton';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Image src="/r.png" alt="Logo" width={100} height={100} />
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
        </div>
        <div className={styles.searchBarContainer}>
          <input type="text" placeholder="Search an Item you want to secure or find by Vault name..." className={`${styles.searchBar} ${styles.centered}`} />
        </div>
        <div className={styles.rightNav}>
          <Link href="/dashboard" passHref legacyBehavior>
            <a className={styles.dashboard}>Dashboard</a>
          </Link>
          <ConnectButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
