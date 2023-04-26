import { KeyringAddress } from '@polkadot/ui-keyring/types';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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
  const { keyring, currentAccount } = useSubstrateState();
  const [accounts, setAccounts] = useState<KeyringAddress[]>([]);

  useEffect(() => {
    if (keyring) {
      setAccounts(keyring.getAccounts());
    }
  }, [keyring]);

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
                      <Button onClick={() => setCurrentAccount(account)}>
                        Set account
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
