import { http, createConfig } from 'wagmi'
import { arbitrum, base, mainnet, sepolia, optimism } from 'wagmi/chains'


export const config = createConfig({
		chains: [mainnet, base, sepolia, arbitrum, optimism],
		transports: {
			[mainnet.id]: http(),
			[base.id]: http(),
			[sepolia.id]: http(),
			[arbitrum.id]: http(),
			[optimism.id]: http(),
		},
})