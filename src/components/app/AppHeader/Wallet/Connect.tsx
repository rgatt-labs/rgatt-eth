// // components/ConnectWallet.tsx
// import React, { useState } from 'react';
// import { ConnectButton, useActiveWalletChain, useActiveAccount, useSwitchActiveWalletChain, useWalletBalance } from "thirdweb/react";
// import { sepolia, mainnet, arbitrum, optimism, base } from 'thirdweb/chains';

// const supportedChains = [sepolia, mainnet, arbitrum, optimism, base];

// const ConnectWallet: React.FC = () => {
//   const account = useActiveAccount(); // Obtenir le compte actif
//   const activeChain = useActiveWalletChain(); // Obtenir la chaîne active
//   const switchChain = useSwitchActiveWalletChain(); // Fonction pour changer de chaîne
//   const { data: balance, isLoading } = useWalletBalance(account?.address);

//   const handleChangeChain = (chainId: number) => {
//     switchChain(chainId).catch((error) => console.error(error));
//   };

//   return (
//     <div>
//       <ConnectButton />
//       {account ? (
//         <div>
//           <p>Wallet address: {account.address}</p>
//           {isLoading ? (
//             <p>Loading balance...</p>
//           ) : (
//             <p>Wallet balance: {balance?.displayValue} {balance?.symbol}</p>
//           )}
//           <div>
//             <label htmlFor="chain-select">Select Chain: </label>
//             <select
//               id="chain-select"
//               onChange={(e) => handleChangeChain(Number(e.target.value))}
//               value={activeChain?.id}
//             >
//               {supportedChains.map((chain) => (
//                 <option key={chain.id} value={chain.id}>
//                   {chain.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       ) : (
//         <p>No wallet connected</p>
//       )}
//     </div>
//   );
// };

// export default ConnectWallet;
