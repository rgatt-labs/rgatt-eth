// components/landing/LandingFooter/LandingFooter.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingFooter.module.css';

const LandingFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© rgatt 2024. All Rights Reserved.</p>
        <nav className={styles.footerNav}>
          <Link href="/credits">Credits</Link>
          <Link href="/privacy">Privacy Statement</Link>
          <Link href="/termsofuse">Terms of Use</Link>
        </nav>
        <div className={styles.socialIcons}>
          <a href="https://discord.gg/sdPTg9A7BG" target="_blank" rel="noopener noreferrer">
            <Image src="/discord.png" alt="Discord" width={20} height={20} />
          </a>
          <a href="https://github.com/rgatt-labs" target="_blank" rel="noopener noreferrer">
            <Image src="/github.png" alt="Github" width={20} height={20} />
          </a>
          <a href="https://x.com/rgattlabs" target="_blank" rel="noopener noreferrer">
            <Image src="/x.png" alt="X" width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;