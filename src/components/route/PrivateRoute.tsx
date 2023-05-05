import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const { currentAccount, keyringState } = useSubstrateState();

  useEffect(() => {
    if (
      keyringState === 'READY' &&
      !currentAccount &&
      router.asPath !== '/login'
    ) {
      router.push('/login');
    }
  }, [router, currentAccount, keyringState]);

  return children;
};
