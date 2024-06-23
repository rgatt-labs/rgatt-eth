// ChainSelector.tsx
import React from 'react';

const ChainSelector: React.FC = () => (
  <div>
    <select>
      <option value="ethereum">Ethereum</option>
      <option value="starknet">Starknet</option>
      <option value="arbitrum">Arbitrum</option>
      <option value="base">Base</option>
      <option value="zksync">zkSync</option>
      <option value="scroll">Scroll</option>
    </select>
  </div>
);

export default ChainSelector;
