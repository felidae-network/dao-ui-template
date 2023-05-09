import { ContractPromise } from '@polkadot/api-contract';
import { createContext } from 'react';

import {
  AbiMessage,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from '@/types';

export interface ContractContextType {
  contract: ContractPromise;
  callMessage: (
    message: AbiMessage,
    contractOptions: ContractOptions,
    cb: (result: ISubmittableResult) => unknown
  ) => Promise<void>;
  queryMessage: (...args: QueryMessageProps[]) => Promise<ContractExecResult>;
}

const ContractContextValues = {} as ContractContextType;

export const ContractContext = createContext<ContractContextType>(
  ContractContextValues
);
