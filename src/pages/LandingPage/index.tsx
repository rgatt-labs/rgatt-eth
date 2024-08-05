import React from 'react';
import styles from './LandingPage.module.css';
import LandingHeader from '@/components/landing/LandingHeader/LandingHeader';
import LandingMain from '@/components/landing/LandingMain/LandingMain';
import LandingFooter from '@/components/landing/LandingFooter/LandingFooter';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <LandingHeader />
        <LandingMain />
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingPage;