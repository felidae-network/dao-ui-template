import React, { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { useUser } from '@/context/user/UserContextProvider';

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

export default function ProfilePage() {
  const { currentAccount, api } = useSubstrateState();
  const { user } = useUser();
  const [balance, setBalance] = useState(0);
  const [nonce, setNoce] = useState();

  useEffect(() => {
    (async () => {
      if (currentAccount) {
        const accountInfo = await api.query.system.account(
          currentAccount.address
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const accountInfoJson = accountInfo.toHuman() as any;

        setBalance(accountInfoJson.data.free);
        setNoce(accountInfoJson.nonce);
      }
    })();
  }, [currentAccount, api]);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        {user && (
          <div className='mx-auto w-full max-w-[1000px]'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-base font-semibold leading-7'>
                Applicant Information
              </h3>
              <p className='mt-1 max-w-2xl text-sm leading-6'>
                Personal details and application.
              </p>
            </div>
            <div className='mt-6 border-t border-gray-100'>
              <dl className='divide-y divide-gray-100'>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Full name</dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{user.name}</p>
                  </div>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Address</dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{currentAccount.address}</p>
                  </div>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Balance</dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{balance}</p>
                  </div>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Nonce</dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{nonce}</p>
                  </div>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Status</dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{user.memberStatus}</p>
                  </div>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>Role</dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{user.memberRole}</p>
                  </div>
                </div>
                <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                  <dt className='text-sm font-medium leading-6'>
                    Member since
                  </dt>
                  <div className='mt-1 text-sm leading-6'>
                    <p>{new Date(parseInt(user.startTime)).toDateString()}</p>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
