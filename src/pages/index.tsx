import React from 'react';

import { DaoStats } from '@/components/dao';
import { DaoInfo } from '@/components/dao/DaoInfo';
import Layout from '@/components/layout/Layout';
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
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='text-center'>Dashboard</h1>
        <div className='mt-10 flex w-full flex-row-reverse items-start justify-end gap-10 px-10'>
          <DaoInfo />
          <DaoStats />
        </div>
      </main>
    </Layout>
  );
}
