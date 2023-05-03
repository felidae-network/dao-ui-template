import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const { currentAccount } = useSubstrateState();

  useEffect(() => {
    console.log('router ', router);

    if (!currentAccount && router.asPath !== '/login') {
      router.push('/login');
    }
  }, [router, currentAccount]);

  return children;
};
