import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./TokenSelect.module.css";

type TokenKey = "ETH_ADDRESS" | "DAI_ADDRESS" | "USDC_ADDRESS" | "USDT_ADDRESS";

export const TokenData: Record<
  TokenKey,
  { address: string; symbol: string; image: string }
> = {
  ETH_ADDRESS: {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    image: "/eth.png",
  },
  DAI_ADDRESS: {
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    symbol: "DAI",
    image: "/dai.png",
  },
  USDC_ADDRESS: {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    symbol: "USDC",
    image: "/usdc.png",
  },
  USDT_ADDRESS: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    symbol: "USDT",
    image: "/usdt.png",
  },
};

interface TokenSelectProps {
  onChange: (value: string) => void;
  defaultToken?: TokenKey;
}

export default function TokenSelect({
  onChange,
  defaultToken = "ETH_ADDRESS",
}: TokenSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenKey>(defaultToken);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTokenSelect = (token: TokenKey) => {
    setSelectedToken(token);
    setIsOpen(false);
    onChange(TokenData[token].address);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <div className={styles.selectedToken} onClick={() => setIsOpen(!isOpen)}>
        <Image
          src={TokenData[selectedToken].image}
          width={20}
          height={20}
          alt={TokenData[selectedToken].symbol}
        />
        <span>{TokenData[selectedToken].symbol}</span>
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles.tokenList}>
          {(Object.keys(TokenData) as TokenKey[]).map((key) => (
            <li
              key={key}
              onClick={() => handleTokenSelect(key)}
              className={selectedToken === key ? styles.selected : ""}
            >
              <Image
                src={TokenData[key].image}
                width={20}
                height={20}
                alt={TokenData[key].symbol}
              />
              <span>{TokenData[key].symbol}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
