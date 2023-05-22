import { ContractPromise } from '@polkadot/api-contract';
import React, { useContext, useEffect, useState } from 'react';

import { CONTRACT_ADDRESS } from '@/config';
import { ContractContext } from '@/context/contract/ContractContext';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { getContractMatadata } from '@/helpers/getContractMetadata';

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
  const [contractLoading, setContractLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (api) {
        try {
          const contractMetadata = await getContractMatadata();
          const address = CONTRACT_ADDRESS as string;
          const contract = new ContractPromise(api, contractMetadata, address);

          setContract(contract);
          setContractLoading(false);
        } catch (error: unknown) {
          setContractLoading(false);
          alert(error);
        }
      }
    })();
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
    <ContractContext.Provider
      value={{ contract, callMessage, queryMessage, contractLoading }}
    >
      {props.children}
    </ContractContext.Provider>
  );
};

const useContract = () => useContext(ContractContext);

export { ContractContext, ContractContextProvider, useContract };
