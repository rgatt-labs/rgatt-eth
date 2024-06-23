// src/pages/app.tsx
import React from 'react';
import Header from '../components/header/header';
// import Vaults from '../components/pages/vaults/vaults';

const App: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Header />
      {/* <Vaults /> */}
    </div>
  );
};

export default App;
