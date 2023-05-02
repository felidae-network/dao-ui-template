import { ContractPromise } from '@polkadot/api-contract';
import { createContext } from 'react';

export interface ContractContextType {
  contract: ContractPromise;
  callMessage: (message: string) => Promise<void>;
  queryMessage: (message: string) => Promise<void>;
}

const ContractContextValues = {} as ContractContextType;

export const ContractContext = createContext<ContractContextType>(
  ContractContextValues
);
