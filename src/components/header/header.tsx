import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/ecosystem" passHref legacyBehavior>
              <a className={styles.navLink}>Ecosystem</a>
            </Link>
          </li>
          <li>
            <Link href="/community" passHref legacyBehavior>
              <a className={styles.navLink}>Community</a>
            </Link>
          </li>
          <li>
            <Link href="/governance" passHref legacyBehavior>
              <a className={styles.navLink}>nance</a>
            </Link>
          </li>
          <li>
            <Link href="/developers" passHref legacyBehavior>
              <a className={styles.navLink}>Developers</a>
            </Link>
          </li>
          <li>
            <Link href="/blog" passHref legacyBehavior>
              <a className={styles.navLink}>Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/faq" passHref legacyBehavior>
              <a className={styles.navLink}>FAQ</a>
            </Link>
          </li>
          <li>
            <Link href="/jobs" passHref legacyBehavior>
              <a className={styles.navLink}>Jobs</a>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <Link href="/vaults" passHref legacyBehavior>
          <a className={styles.launchApp}>Launch App</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
