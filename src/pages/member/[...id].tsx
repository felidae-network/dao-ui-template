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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { useGetMemberInfo } from '@/hooks/messages';
import { IGetMember } from '@/hooks/messages';
import { useGetMemberList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';
// useGetMembersProject
import { useGetMembersProject } from '@/hooks/messages/useGetMembersprojectList';
import { useGetMembersTicket } from '@/hooks/useGetMembersTicketList';

import Layout from '@/components/layout/Layout';
// import { useGetMembersProject } from '@/hooks/messages/useGetMembersprojectList';
import { UpdateMemberRole } from '@/components/members/updateMemberRole';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';
export default function MemberInfoPage() {
  const router = useRouter();
  const memberId = router.query.id![1] as unknown as number;

  const { loading, decodedOutput } = useGetMemberInfo({
    memberId,
  });
  const {
    loading: getMembersTicketListLoading,
    decodedOutput: getMembersTicketListdecodeOutput,
  } = useGetMembersTicket({
    memberId: memberId,
  });
  console.log(
    'getMembersTicketListdecodeOutput',
    getMembersTicketListdecodeOutput?.value
  );
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();
  // const { loading:l, decodedOutput:doc } = useAddStake({amount:1});
  // console.log("loadingM",doc?.value);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<IGetMember>();
  const {
    decodedOutput: decodecoutputMEmberList,
    loading: loadingMemberList,
    refetch,
  } = useGetMemberList();
  console.log('decodecoutputProjectList', decodecoutputMEmberList?.value);
  console.log('loadingMemberList', loadingMemberList);

  const {
    decodedOutput: decodecoutputProjectList,
    loading: loadingProjectList,
  } = useGetMembersProject({ memberId: memberId });
  console.log('decodecoutputProjectList', decodecoutputProjectList?.value.Ok);
  console.log('loadingProjectList', loadingProjectList);

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      {/* <Modal
        open={UpdateModalOpen}
        onClickBackdrop={() => setUpdateModalOpen(false)}
      >
        <UpdateMemberRole
          member={selectedMember!}
          toggleVisible={() => {setUpdateModalOpen(!UpdateModalOpen);
            setSelectedMember(undefined);
          
          }}
          refetchProjects={() => refetch()}
        />
      </Modal> */}

      {selectedProject && (
        <Modal
          open={updateModalOpen}
          onClickBackdrop={() => {
            setUpdateModalOpen(false);
            setSelectedProject(undefined);
          }}
        >
          <UpdateMemberRole
            toggleVisible={() => {
              setUpdateModalOpen(false);
              setSelectedProject(undefined);
            }}
            refetchMember={() => refetch()}
            member={selectedProject!}
          />
        </Modal>
      )}
      <main>
        <h1 className='text-center'>Membner Info</h1>

        {loading && getMembersTicketListLoading && getDaoIdLoading ? (
          <Skeleton />
        ) : (
          <>
            {!decodedOutput ||
            !decodedOutput.value ||
            !getMembersTicketListdecodeOutput ||
            !getMembersTicketListdecodeOutput.value ||
            !getDaoIdDecodedOutput ||
            !getDaoIdDecodedOutput.value ? (
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
                        Name
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.name}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Role
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        <Button
                          onClick={() => {
                            setSelectedProject(decodedOutput.value.Ok);
                            setUpdateModalOpen(true);
                          }}
                          startIcon={<AiOutlinePlus />}
                        >
                          {decodedOutput.value.Ok.memberRole}
                        </Button>
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Efficiency
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.memberEfficiency}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Status
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.memberStatus}
                      </dd>
                    </div>
                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Ticket List
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.taskList.map(
                          (taskId, index) => (
                            <Link key={index} href={`/ticket/${taskId}`}>
                              <Button
                                onClick={() => {
                                  console.log('logged');
                                }}
                                className='mb-2 mr-2'
                              >
                                {`T${taskId}`}
                              </Button>
                            </Link>
                          )
                        )}
                      </dd>
                    </div>

                    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                      <dt className='text-sm font-medium leading-6 text-gray-900'>
                        Project List
                      </dt>
                      <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                        {decodedOutput.value.Ok.projectList.map(
                          (ProjectId, index) => (
                            <Link
                              key={index}
                              href={`/project/${getDaoIdDecodedOutput.value}/${ProjectId}`}
                            >
                              <Button
                                key={index}
                                onClick={() => {
                                  console.log('logged');
                                }}
                                className='mb-2 mr-2'
                              >
                                {`P${ProjectId}`}
                              </Button>
                            </Link>
                          )
                        )}
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
