// ConnectButton.tsx
"use client";

import { Connector, useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import * as React from 'react'
import './Connect.module.css'

const supportedChains = [
  { id: 1, name: 'Ethereum' },
  { id: 11155111, name: 'Sepolia' },
  { id: 42161, name: 'Arbitrum' },
  { id: 8453, name: 'Base' },
  { id: 10, name: 'Optimism' },
]

function ConnectWallet() {
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const account = useAccount()
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const { data: balance } = useBalance({ address: account.address })

  const [isOpen, setIsOpen] = React.useState(false)

  const handleConnect = (connector: Connector) => {
    connect({ connector })
    setIsOpen(false)
  }

  return (
    <div className="wallet-connect">
      {account.isConnected ? (
        <div className="connected-state">
          <button onClick={() => setIsOpen(!isOpen)} className="wallet-button">
            {chain?.name} | {balance?.formatted.slice(0, 6)} {balance?.symbol}
          </button>
          {isOpen && (
            <div className="dropdown">
              <div className="chain-selector">
                {supportedChains.map((supportedChain) => (
                  <button
                    key={supportedChain.id}
                    onClick={() => switchChain?.({ chainId: supportedChain.id })}
                    className={`chain-option ${chain?.id === supportedChain.id ? 'active' : ''}`}
                  >
                    {supportedChain.name}
                  </button>
                ))}
              </div>
              <button onClick={() => disconnect()} className="disconnect-button">
                Disconnect
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="connect-state">
          <button onClick={() => setIsOpen(!isOpen)} className="connect-button">
            Connect Wallet
          </button>
          {isOpen && (
            <div className="dropdown">
              {connectors.map((connector) => (
                <button key={connector.id} onClick={() => handleConnect(connector)} className="wallet-option">
                  {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ConnectWallet