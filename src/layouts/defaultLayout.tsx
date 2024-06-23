// DefaultLayout.tsx
import React, { ReactNode } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default DefaultLayout;
