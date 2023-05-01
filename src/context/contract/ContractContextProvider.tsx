import { ContractPromise } from '@polkadot/api-contract';
import React, { useContext, useEffect, useState } from 'react';

import { ContractContext } from '@/context/contract/ContractContext';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import contractMetadata from '../../../felidaeDAO.contract.json';

interface ContractContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const ContractContextProvider = (props: ContractContextProviderProps) => {
  const { api } = useSubstrateState();
  const [contract, setContract] = useState<ContractPromise>(
    {} as ContractPromise
  );
  useEffect(() => {
    if (contractMetadata && api) {
      try {
        const address = '5GybzbsFfJGRGfjTRGbs1BPu9E5cvUXxrqWFGaadUnJ3i3mo';
        const contract = new ContractPromise(api, contractMetadata, address);

        setContract(contract);
      } catch (error: unknown) {
        alert(error);
      }
    }
  }, [api]);

  return (
    <ContractContext.Provider value={{ contract }}>
      {props.children}
    </ContractContext.Provider>
  );
};

const useContract = () => useContext(ContractContext);

export { ContractContext, ContractContextProvider, useContract };
