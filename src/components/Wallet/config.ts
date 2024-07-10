// // config.ts
// import { configureChains, createConfig } from '@wagmi/core';
// import { mainnet, arbitrum, bsc, optimism, polygon } from '@wagmi/core/chains';
// import { publicProvider } from '@wagmi/core/providers/public';
// import { alchemyProvider } from '@wagmi/core/providers/alchemy';
// import { infuraProvider } from '@wagmi/core/providers/infura';
// import { createModal } from '@rabby-wallet/rabbykit';

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, arbitrum, bsc, optimism, polygon],
//   [
//     alchemyProvider({ apiKey: 'KHMTFgj9w4DSqTVPDxXv5E1FR-JFA1cp' }),
//     infuraProvider({ apiKey: 'dc829f538dd44afcbe2f2ef1923ec62d' }),
//     publicProvider(),
//   ]
// );

// const config = createConfig({
//   autoConnect: true,
//   publicClient,
//   webSocketPublicClient,
// });

// let rabbyKit: any = null;

// export const initializeRabbyKit = () => {
//   if (typeof window !== 'undefined' && rabbyKit === null) {
//     rabbyKit = createModal({
//       chains,
//       wagmi: config,
//       projectId: 'yourProjectId',
//       appName: 'RabbyKit',
//     });
//   }
//   return rabbyKit;
// };
