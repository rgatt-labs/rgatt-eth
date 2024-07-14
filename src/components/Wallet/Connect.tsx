// ConnectButton.tsx
"use client";

import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'
import * as React from 'react'

function ConnectWallet() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const account = useAccount()
  const { data, error } = useBalance({ address: account.address, chainId: account.chainId })

  return (
	<div>
		{account.isConnected ? (
			<button onClick={() => disconnect()}>
				Disconnect
			</button>
		) : (
		connectors.map((connector) => (
			<button key={connector.id} onClick={() => connect({ connector })}>
				Connect with {connector.name}
			</button>
		))
	  )}
	</div>
  );
}

export default ConnectWallet