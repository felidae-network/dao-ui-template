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
  const { api, currentAccount, chainProps, keyring } = useSubstrateState();
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

  const callMessage = async (message: string) => {
    if (!contract.abi.messages.find((e) => e.method === message))
      return alert('no such message');

    if (!currentAccount) {
      return alert('select current account');
    }

    const { web3FromAddress } = await import('@polkadot/extension-dapp');

    const injector = chainProps.systemChainType.isDevelopment
      ? undefined
      : await web3FromAddress(currentAccount.address);
    const account = chainProps.systemChainType.isDevelopment
      ? keyring.getPair(currentAccount.address)
      : currentAccount.address;

    const gasLimit = 0;
    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;

    try {
      const value = contract.tx[message]({
        value: undefined,
        gasLimit,
        storageDepositLimit,
      });

      await value.signAndSend(
        account,
        {
          signer: injector?.signer || undefined,
        },
        async (result) => {
          if (result.isInBlock) {
            alert(result.dispatchInfo);
          }
        }
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log('error ', error);
      alert(err.message);
    }
  };

  const queryMessage = async (message: string) => {
    if (!contract.abi.messages.find((e) => e.method === message))
      return alert('no such message');

    if (!currentAccount) {
      return alert('select current account');
    }

    const gasLimit = 0;
    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;

    try {
      const { result, output } = await contract.query[message](
        currentAccount.address,
        {
          gasLimit,
          storageDepositLimit,
        }
      );

      const dispatchError =
        result.isErr && result.asErr.isModule
          ? contract.registry.findMetaError(result.asErr.asModule)
          : undefined;

      console.log('dispatch erro ', dispatchError);

      // check if the call was successful
      if (result.isOk) {
        // output the return value
        console.log('Success', output?.toHuman());
      } else {
        console.error(`Error: ${result.asErr}`);
      }
    } catch (error) {
      console.log('error ', error);
    }
  };

  return (
    <ContractContext.Provider value={{ contract, callMessage, queryMessage }}>
      {props.children}
    </ContractContext.Provider>
  );
};

const useContract = () => useContext(ContractContext);

export { ContractContext, ContractContextProvider, useContract };
