// // Assumes you've wrapped your application in a `<ThirdwebProvider>`

// import { useEffect } from "react";
// import { defineChain } from "thirdweb";
// import { useSetActiveWallet } from "thirdweb/react";
// import { createWalletAdapter } from "thirdweb/wallets";
// import {
//   useDisconnect,
//   useSwitchChain,
//   useWalletClient,
// } from "wagmi";
// import { viemAdapter } from "thirdweb/adapters/viem";
// import { client } from "./client";

// const { data: walletClient } = useWalletClient(); // from wagmi
// const { disconnectAsync } = useDisconnect(); // from wagmi
// const { switchChainAsync } = useSwitchChain(); // from wagmi
// const setActiveWallet = useSetActiveWallet(); // from thirdweb/react

// // whenever the walletClient changes,
// // we adapt it to a thirdweb account and set it as the active wallet
// useEffect(() => {
//   const setActive = async () => {
//     if (walletClient) {
//       // adapt the walletClient to a thirdweb account
//       const adaptedAccount = viemAdapter.walletClient.fromViem({
//         walletClient: walletClient as any, // accounts for wagmi/viem version mismatches
//       });
//       // create the thirdweb wallet with the adapted account
//       const thirdwebWallet = createWalletAdapter({
//         client,
//         adaptedAccount,
//         chain: defineChain(await walletClient.getChainId()),
//         onDisconnect: async () => {
//           await disconnectAsync();
//         },
//         switchChain: async (chain) => {
//           await switchChainAsync({ chainId: chain.id as any });
//         },
//       });
//       setActiveWallet(thirdwebWallet);
//     }
//   };
//   setActive();
// }, [walletClient]);
