import React from 'react';

import { useIsMember } from '@/hooks/messages';

import Layout from '@/components/layout/Layout';
import { ProjectList } from '@/components/projects';
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

export default function ProjectsPage() {
  const { loading, decodedOutput } = useIsMember();
  console.log('loading', loading);
  const isMember = decodedOutput?.value;

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <h1 className='text-center'>Projects</h1>
        {isMember ? <ProjectList /> : <p>You are not a member.</p>}
      </main>
    </Layout>
  );
}
