// // components/WalletConnect/WalletConnectButton.tsx
// import React, { useEffect, useState } from 'react';
// import { initializeRabbyKit } from './config';
// import styles from './WalletConnectButton.module.css';
// import { useAccount, useConnect, useDisconnect } from '@wagmi/core';

// const WalletConnectButton: React.FC = () => {
//   const { address, isConnected } = useAccount();
//   const { connectAsync } = useConnect();
//   const { disconnectAsync } = useDisconnect();
//   const [rabbyKit, setRabbyKit] = useState<any>(null);

//   useEffect(() => {
//     const kit = initializeRabbyKit();
//     setRabbyKit(kit);
//   }, []);

//   const connectWallet = async () => {
//     try {
//       await rabbyKit?.open();
//       await connectAsync();
//     } catch (error) {
//       console.error('Failed to connect wallet:', error);
//     }
//   };

//   const disconnectWallet = async () => {
//     try {
//       await disconnectAsync();
//     } catch (error) {
//       console.error('Failed to disconnect wallet:', error);
//     }
//   };

//   return (
//     <div>
//       {isConnected ? (
//         <div>
//           <span>{address}</span>
//           <button onClick={disconnectWallet} className={styles.button}>Disconnect</button>
//         </div>
//       ) : (
//         <button onClick={connectWallet} className={styles.button}>Connect Wallet</button>
//       )}
//     </div>
//   );
// };

// export default WalletConnectButton;
