// components/landing/LandingHeader/LandingHeader.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingHeader.module.css';

const LandingHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/rgatt.png" alt="rgatt logo" width={150} height={150} />
      </div>
      <nav className={styles.nav}>
        <Link href="/about">About us</Link>
        <Link href="/governance">Governance</Link>
        <Link href="/community">Community</Link>
        <a href="https://www.notion.so/rgatt-Career-ee3e825b78074237ac561acedc6a2d9b" className={styles.navLink} target="_blank" rel="noopener noreferrer">Career</a>
        <a href="https://app.gitbook.com/o/SrhVlI9gMVtnIeFvV0U2/s/LJrIJoWVnX9eC5KfHPFf/" className={styles.navLink} target="_blank" rel="noopener noreferrer">Docs</a>            
        <Link href="/app" legacyBehavior>
          <a className={styles.launchButton}>Launch App</a>
        </Link>
      </nav>
    </header>
  );
};

export default LandingHeader;