import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import Header from '@/components/header/Header';
import { PrivateRoute } from '@/components/route/PrivateRoute';

import { ContractContextProvider } from '@/context/contract/ContractContextProvider';
import { SubstrateContextProvider } from '@/context/substrate/SubstrateContextProvider';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SubstrateContextProvider>
      <ContractContextProvider>
        <Header />
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      </ContractContextProvider>
    </SubstrateContextProvider>
  );
}

export default MyApp;
