import React from 'react';

import { useGetAdmin } from '@/hooks/messages';
import { useGetMemberList } from '@/hooks/messages';
import { useGetContractBalance } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';
import { IGetDaoInfo, useGetDaoInfo } from '@/hooks/messages/useGetDaoInfo';

import Layout from '@/components/layout/Layout';
import { LoadingSpinner } from '@/components/loading/Loading';
import Seo from '@/components/Seo';
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
  const { loading, decodedOutput } = useGetDaoInfo();
  const { loading: getDaoIdLoading, decodedOutput: getDaoIdOutput } =
    useGetDaoId();
  const { loading: getAdminLoading, decodedOutput: getAdminDecodedOutput } =
    useGetAdmin();
  const { loading: getMemberLoading, decodedOutput: getMemberDecodedOutput } =
    useGetMemberList();
  const { loading: getBalanceLoading, decodedOutput: getBalanceOutput } =
    useGetContractBalance();

  const isLoading = () =>
    loading ||
    getAdminLoading ||
    getMemberLoading ||
    getBalanceLoading ||
    getDaoIdLoading;

  const _isDecodedError = () => {
    decodedOutput?.isError ||
      getDaoIdOutput?.isError ||
      getAdminDecodedOutput?.isError ||
      getMemberDecodedOutput?.isError ||
      getBalanceOutput?.isError;
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='text-center'>Dashboard</h1>
        {isLoading() ? (
          <div className='flex items-center justify-center'>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {!decodedOutput ||
            !decodedOutput.value ||
            !getAdminDecodedOutput ||
            !getAdminDecodedOutput.value ||
            !getMemberDecodedOutput ||
            !getMemberDecodedOutput.value ||
            !getBalanceOutput ||
            !getBalanceOutput.value ||
            !getDaoIdOutput ||
            !getDaoIdOutput.value ? (
              'no data'
            ) : (
              <div className='mx-auto my-5 w-full max-w-[1000px]'>
                <div className='px-4 sm:px-0'>
                  <h3 className='text-base font-semibold leading-7 text-gray-900'>
                    DAO Information
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    DAO details and info.
                  </p>
                </div>
                <div className='mt-6 border-t border-gray-100'>
                  <dl className='divide-y divide-gray-100'>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Dao name
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {
                          (decodedOutput.value as unknown as IGetDaoInfo)
                            .daoName
                        }
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Description
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {
                          (decodedOutput.value as unknown as IGetDaoInfo)
                            .description
                        }
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Profile
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {(decodedOutput.value as unknown as IGetDaoInfo)
                          .profile || 'N/A'}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Website
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {(decodedOutput.value as unknown as IGetDaoInfo)
                          .website || 'N/A'}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Admin
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {(getAdminDecodedOutput.value as unknown as string) ||
                          'N/A'}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Members Count
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {(getMemberDecodedOutput.value as unknown as string)
                          .length || 'N/A'}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Contracts Balance
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {(getBalanceOutput.value as unknown as string) || 'N/A'}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        DaoId
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {(getDaoIdOutput.value as unknown as string) || 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}
