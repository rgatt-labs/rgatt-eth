import React from 'react';
import Link from 'next/link';
import styles from './Home.module.css'; // Importer le fichier CSS

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className="flex items-center">
            <ul className={styles.navLinks}>
              <li><a href="#ecosystem" className={styles.navLink}>Ecosystem</a></li>
              <li><a href="#community" className={styles.navLink}>Community</a></li>
              <li><a href="#governance" className={styles.navLink}>Governance</a></li>
              <li><a href="#developers" className={styles.navLink}>Developers</a></li>
              <li><a href="#blog" className={styles.navLink}>Blog</a></li>
              <li><a href="#faq" className={styles.navLink}>FAQ</a></li>
              <li><a href="#jobs" className={styles.navLink}>Jobs</a></li>
            </ul>
          </div>
          <div>
            <Link href="/app" legacyBehavior>
              <a className={styles.launchApp}>Launch App</a>
            </Link>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <h1 className={styles.mainTitle}>rgatt PROTOCOL</h1>
        <p className={styles.mainDescription}>This is the homepage of our decentralized insurance dApp.</p>
      </main>
    </div>
  );
};

export default Home;
