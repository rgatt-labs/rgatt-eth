// ConnectButton.tsx
"use client";

import { Connector, useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import * as React from 'react'
import styles from './Connect.module.css'

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
    <div className={styles.walletConnect}>
      {account.isConnected ? (
        <div className={styles.connectedState}>
          <button onClick={() => setIsOpen(!isOpen)} className={styles.walletButton}>
            {chain?.name} | {balance?.formatted.slice(0, 6)} {balance?.symbol}
          </button>
          {isOpen && (
            <div className={styles.dropdown}>
              <div className={styles.chainSelector}>
                {supportedChains.map((supportedChain) => (
                  <button
                    key={supportedChain.id}
                    onClick={() => switchChain?.({ chainId: supportedChain.id })}
                    className={`${styles.chainOption} ${chain?.id === supportedChain.id ? styles.active : ''}`}
                  >
                    {supportedChain.name}
                  </button>
                ))}
              </div>
              <button onClick={() => disconnect()} className={styles.disconnectButton}>
                Disconnect
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.connectState}>
          <button onClick={() => setIsOpen(!isOpen)} className={styles.connectButton}>
            Connect Wallet
          </button>
          {isOpen && (
            <div className={styles.dropdown}>
              {connectors.map((connector) => (
                <button key={connector.id} onClick={() => handleConnect(connector)} className={styles.walletOption}>
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