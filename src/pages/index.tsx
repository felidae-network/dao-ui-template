import { AbiMessage } from '@polkadot/api-contract/types';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useContract } from '@/context/contract/ContractContextProvider';
import {
  useSubstrate,
  useSubstrateState,
} from '@/context/substrate/SubstrateContextProvider';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const { setCurrentAccount } = useSubstrate();
  const { accounts, currentAccount, chainProps, keyring } = useSubstrateState();
  const { contract } = useContract();
  const [results, setResults] = useState<unknown[]>([]);
  const [_message, setMessage] = useState<AbiMessage>();

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
      const { gasRequired, result, output, ...everything } =
        await contract.query[message](currentAccount.address, {
          gasLimit,
          storageDepositLimit,
        });

      // The actual result from RPC as `ContractExecResult`
      console.log(result.toHuman());

      // the gas consumed for contract execution
      console.log(gasRequired.toHuman());

      console.log('isOk ', result.isOk);
      console.log('isErr ', result.isErr);

      console.log('everything ', everything);

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

  const callMessage = async (message: string) => {
    if (!contract.abi.messages.find((e) => e.method === message))
      return alert('no such message');

    if (!currentAccount) {
      return alert('select current account');
    }

    setMessage(contract.abi.messages.find((e) => e.method === message));

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
            setResults([
              ...results,
              {
                id: result.txIndex,
                message,
                time: Date.now(),
                events: result.events,
                error: result.dispatchError?.isModule
                  ? contract?.registry.findMetaError(
                      result.dispatchError.asModule
                    )
                  : undefined,
              },
            ]);

            alert(result.dispatchInfo);
            await queryMessage(message);
          }
        }
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log('error ', error);
      alert(err.message);
    }
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <div className='relative overflow-x-auto'>
          <table className='w-full max-w-[1000px] text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Account name
                </th>
                <th scope='col' className='px-6 py-3'>
                  address
                </th>
                <th scope='col' className='px-6 py-3'>
                  created at
                </th>
                <th scope='col' className='px-6 py-3'>
                  active
                </th>
                <th scope='col' className='px-6 py-3'>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts &&
                accounts.map((account) => (
                  <tr
                    key={account.address}
                    className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <th
                      scope='row'
                      className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                    >
                      {account.meta.name}
                    </th>
                    <td className='px-6 py-4'>{account.address}</td>
                    <td className='px-6 py-4'>{account.meta.whenCreated}</td>
                    <td className='px-6 py-4'>
                      {currentAccount &&
                      account.address === currentAccount.address
                        ? 'Yes'
                        : 'No'}
                    </td>
                    <td className='px-6 py-4'>
                      <Button
                        disabled={Boolean(
                          currentAccount &&
                            account.address === currentAccount.address
                        )}
                        onClick={() => setCurrentAccount(account)}
                      >
                        Set account
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <h1 className='my-4'>MESSAGES</h1>

        <div className='relative overflow-x-auto'>
          <table className='w-full max-w-[1000px] text-left text-sm text-gray-500 dark:text-gray-400'>
            <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Method name
                </th>
                <th scope='col' className='px-6 py-3'>
                  description
                </th>
                <th scope='col' className='px-6 py-3'>
                  args
                </th>
                <th scope='col' className='px-6 py-3'>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {contract &&
                contract.abi &&
                contract.abi.messages.map((message) => (
                  <tr
                    key={message.method}
                    className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <th
                      scope='row'
                      className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                    >
                      {message.method}()
                    </th>
                    <td className='px-6 py-4'>{message.docs}</td>
                    <th scope='row' className='px-6 py-4'>
                      {message.args.map((arg) => (
                        <>
                          <p>
                            {arg.name}: <span>{arg.type.displayName}</span>
                          </p>
                        </>
                      ))}
                    </th>
                    <td className='px-6 py-4'>
                      <Button
                        disabled={!currentAccount}
                        onClick={() => callMessage(message.method)}
                      >
                        Call
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}
