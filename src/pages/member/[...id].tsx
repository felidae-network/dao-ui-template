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
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';

import { IGetMember, useGetMemberInfo } from '@/hooks/messages';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';

export default function MemberInfoPage() {
  const { loading, setArgValues, decodedOutput } = useGetMemberInfo();
  const router = useRouter();
  console.log('router', router.query.id![1]);
  useEffect(() => {
    if (router.isReady) {
      setArgValues({ memberId: router.query.id![1] as unknown as number });
    }
  }, [router, setArgValues]);
  console.log('balance', decodedOutput?.value);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='my-4 text-center'>Membner Info</h1>

        {loading ? (
          <Skeleton />
        ) : (
          <>
            {!decodedOutput || !decodedOutput.value ? (
              'no data'
            ) : (
              <div className='mx-auto my-5 w-full max-w-[1000px]'>
                <div className='px-4 sm:px-0'>
                  <h3 className='text-base font-semibold leading-7 text-gray-900'>
                    Member Information
                  </h3>
                  <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
                    Member info.
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
                          (decodedOutput.value as unknown as IGetMember)
                            .memberId
                        }
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Description
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {
                          (decodedOutput.value as unknown as IGetMember)
                            .memberId
                        }
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Profile
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        (decodedOutput.value as unknown as IGetMember) .memberId
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Website
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        (decodedOutput.value as unknown as IGetMember) .memberId
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Admin
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        (decodedOutput.value as unknown as IGetMember) .memberId
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Members Count
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        (decodedOutput.value as unknown as IGetMember) .memberId
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Contracts Balance
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        (decodedOutput.value as unknown as IGetMember) .memberId
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
