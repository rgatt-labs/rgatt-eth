import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './LandingMain.module.css';

const LandingMain: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.title}>RGATT ASSURANCE PROTOCOL</div>
      <div className={styles.description}>Redefining insurance for the future.</div>
      <hr className={styles.divider} />
      <div className={styles.stats1}>$XXX.XXX.XXX.XXX</div>
      <div className={styles.stats2}>total value locked across X networks and X vaults</div>
    </main>
  );
};

export default LandingMain;