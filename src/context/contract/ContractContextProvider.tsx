import { ContractPromise } from '@polkadot/api-contract';
import React, { useContext, useEffect, useState } from 'react';

import { ContractContext } from '@/context/contract/ContractContext';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import contractMetadata from '../../../felidaeDAO.contract.json';

import {
  AbiMessage,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from '@/types';

interface ContractContextProviderProps {
  children: React.ReactNode | null;
  [key: string]: unknown;
}

const ContractContextProvider = (props: ContractContextProviderProps) => {
  const { api, currentAccount, chainProps, keyring } = useSubstrateState();
  const [contract, setContract] = useState<ContractPromise>(
    {} as ContractPromise
  );

  useEffect(() => {
    if (contractMetadata && api) {
      try {
        const address = '5DE9sWP5LiaTGYUD4MUvbhT3t2gXmpUsA4pv6MxZnWCR5TfX';
        const contract = new ContractPromise(api, contractMetadata, address);

        setContract(contract);
      } catch (error: unknown) {
        alert(error);
      }
    }
  }, [api]);

  const callMessage = async (
    message: AbiMessage,
    contractOptions: ContractOptions,
    cb: (result: ISubmittableResult) => unknown
  ) => {
    const { web3FromAddress } = await import('@polkadot/extension-dapp');

    const injector = chainProps.systemChainType.isDevelopment
      ? undefined
      : await web3FromAddress(currentAccount.address);
    const account = chainProps.systemChainType.isDevelopment
      ? keyring.getPair(currentAccount.address)
      : currentAccount.address;

    const value = contract.tx[message.method](contractOptions);

    await value.signAndSend(
      account,
      {
        signer: injector?.signer || undefined,
      },
      async (result) => {
        await cb(result);
      }
    );
  };

  const queryMessage = async (args: QueryMessageProps) => {
    const outcome = (await api.call.contractsApi.call(
      ...Object.keys(args).map((key) => args[key as keyof QueryMessageProps])
    )) as ContractExecResult;

    return outcome;
  };

  return (
    <ContractContext.Provider value={{ contract, callMessage, queryMessage }}>
      {props.children}
    </ContractContext.Provider>
  );
};

const useContract = () => useContext(ContractContext);

export { ContractContext, ContractContextProvider, useContract };
