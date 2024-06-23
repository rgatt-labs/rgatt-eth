// vaults/index.tsx
import React from 'react';

const Vaults: React.FC = () => (
  <div>
    <h2>Vaults</h2>
    <p>Select a theme to explore:</p>
    <ul>
      <li><a href="/vaults/vehicles">Vehicles</a></li>
      <li><a href="/vaults/real-estate">Real Estate</a></li>
      <li><a href="/vaults/tech-objects">Tech Objects</a></li>
      <li><a href="/vaults/crypto-assets">Crypto Assets</a></li>
    </ul>
  </div>
);

export default Vaults;
