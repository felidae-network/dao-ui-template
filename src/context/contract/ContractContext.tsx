import { ContractPromise } from '@polkadot/api-contract';
import { createContext } from 'react';

export interface ContractContextType {
  contract: ContractPromise;
}

const ContractContextValues: ContractContextType = {
  contract: {} as ContractPromise,
};

export const ContractContext = createContext<ContractContextType>(
  ContractContextValues
);
