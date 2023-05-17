import React, { useEffect } from 'react';

import { useQuery } from '@/hooks/useQuery';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useContract } from '@/context/contract/ContractContextProvider';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { getDecodedOutput } from '@/helpers/api/output';

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

export default function ProjectsPage() {
  const { currentAccount } = useSubstrateState();
  const { contract } = useContract();
  const { query, outcome, loading, message } = useQuery();

  useEffect(() => {
    if (!loading && message && outcome) {
      const { decodedOutput } = getDecodedOutput(
        outcome,
        message,
        contract.abi.registry
      );

      console.log('outcome ', outcome);

      console.log('decoded output ', decodedOutput);

      alert(decodedOutput);
    }
  }, [loading, outcome, message, contract]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='my-4 text-center'>Projects</h1>

        <div className='relative overflow-x-auto'>
          <table className='mx-auto w-full max-w-[1000px] text-left text-sm text-gray-500 dark:text-gray-400'>
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
                        isLoading={loading}
                        disabled={!currentAccount}
                        onClick={() => query(message)}
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
