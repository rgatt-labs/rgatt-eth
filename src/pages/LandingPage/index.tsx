// pages/LandingPage/index.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingPage.module.css';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <Image src="/rgatt.png" alt="rgatt logo" width={150} height={150} />
          </div>
          <nav className={styles.nav}>
            <Link href="/about" legacyBehavior><a>About Us</a></Link>
            <Link href="/governance" legacyBehavior><a>Governance</a></Link>
            <Link href="/community" legacyBehavior><a>Community</a></Link>
            <a href="https://www.notion.so/rgatt-Career-ee3e825b78074237ac561acedc6a2d9b" className={styles.navLink} target="_blank">Career</a>
            <a href="https://app.gitbook.com/o/SrhVlI9gMVtnIeFvV0U2/s/LJrIJoWVnX9eC5KfHPFf/" className={styles.navLink} target="_blank">Docs</a>            
            <Link href="/app" legacyBehavior>
            <a className={styles.launchButton}>Launch App</a>
            </Link>
          </nav>
        </header>
        <main className={styles.main}>
          <div className={styles.title}>RGATT ASSURANCE PROTOCOL</div>
          <div className={styles.description}>Redefining insurance for the future.</div>
          <hr className={styles.divider} />
          <div className={styles.stats1}>$XXX.XXX.XXX.XXX</div>
          <div className={styles.stats2}>total value locked across X networks and X vaults</div>
        </main>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© rgatt 2024. All Rights Reserved.</p>
            <nav className={styles.footerNav}>
              <a href="/credits">Credits</a>
              <a href="/privacy">Privacy Statement</a>
              <a href="/termsofuse">Terms of Use</a>
            </nav>
            <div className={styles.socialIcons}>
              <a href="https://discord.gg/sdPTg9A7BG"><img src="/discord.png" alt="Discord" /></a>
              <a href="https://github.com/rgatt-labs"><img src="/github.png" alt="Github" /></a>
              <a href="https://x.com/rgattlabs"><img src="/x.png" alt="X" /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
