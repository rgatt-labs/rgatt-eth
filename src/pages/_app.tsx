// pages/_app.tsx
"use client";

import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { WagmiProvider } from 'wagmi';
import { config } from '../wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link
			href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
			rel="stylesheet"
        />
      </Head>
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</WagmiProvider>
    </>
  );
}

export default MyApp;
