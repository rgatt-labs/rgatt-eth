// ConnectButton.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function ConnectButton() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { isConnected } = useAccount()

  return isConnected ? (
    <button onClick={() => disconnect()}>Disconnect</button>
  ) : (
    <div>
      {connectors.map((connector) => (
        <button key={connector.id} onClick={() => connect({ connector })}>
          Connect with {connector.name}
        </button>
      ))}
    </div>
  )
}

export default ConnectButton