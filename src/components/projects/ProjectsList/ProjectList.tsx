import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { IGetProject, useGetAdmin, useGetProjectList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';
import { useGetMemberInfoByAddress } from '@/hooks/messages/useGetMemberInfoByAddress';
import { useGetMembersProject } from '@/hooks/messages/useGetMembersprojectList';

import { LoadingSpinner } from '@/components/loading';
import { CreateProject } from '@/components/projects/CreateProject';
import { UpdateProjectStatus } from '@/components/projects/ProjectStatus';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
interface ProjectListProps {
  children?: React.ReactNode;
}

export const ProjectList: React.FC<ProjectListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetProjectList();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();
  const [selectedProject, setSelectedProject] = useState<IGetProject>();
  // const { user } = useUser();
  // console.log("user",user?.memberId);
  const { currentAccount, api } = useSubstrateState();
  console.log('api', api);

  console.log('currentACC', currentAccount);
  const {
    loading: getMemberInfoloading,
    decodedOutput: decodedOutputMembersInfo,
  } = useGetMemberInfoByAddress({ memberAddress: currentAccount.address });
  console.log('decodedOutputMembersInfo', decodedOutputMembersInfo?.value.Ok);
  console.log('getMemberInfoloading', getMemberInfoloading);

  const {
    decodedOutput: decodedOutputMembersProjects,
    loading: loadingMembersProjects,
  } = useGetMembersProject({
    memberId: decodedOutputMembersInfo?.value.Ok.memberId as unknown as number,
  });
  const { loading: getAdminLoading, decodedOutput: getAdminDecodedOutput } =
    useGetAdmin();
  const isAdmin = getAdminDecodedOutput?.value == currentAccount?.address;
  console.log('isAdmin', isAdmin);
  console.log('getAdminLoading', getAdminLoading);

  return (
    <div>
      <Modal
        open={createModalOpen}
        onClickBackdrop={() => setCreateModalOpen(false)}
      >
        <CreateProject
          toggleVisible={() => setCreateModalOpen(!createModalOpen)}
          refetchProjects={() => refetch()}
        />
      </Modal>
      {selectedProject && (
        <Modal
          open={updateModalOpen}
          onClickBackdrop={() => {
            setUpdateModalOpen(false);
            setSelectedProject(undefined);
          }}
        >
          <UpdateProjectStatus
            toggleVisible={() => {
              setUpdateModalOpen(false);
              setSelectedProject(undefined);
            }}
            refetchProjects={() => refetch()}
            project={selectedProject!}
          />
        </Modal>
      )}
      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Projects</h3>
        <Button
          onClick={() => setCreateModalOpen(true)}
          startIcon={<AiOutlinePlus />}
        >
          Add New
        </Button>
      </div>

      <Table zebra={true} className='w-full'>
        <Table.Head>
          <span />
          <span>Name</span>
          <span>Status</span>
          <span>Created At</span>
          <span>Created by</span>
          <span>Assigned to</span>
          <span>ProjectId</span>
          <span>Description</span>
        </Table.Head>

        <Table.Body>
          {loading && getDaoIdLoading && isAdmin && loadingMembersProjects ? (
            <div className='flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {decodedOutput &&
                decodedOutput.value &&
                !decodedOutput.isError && (
                  <>
                    {decodedOutput.value.length &&
                    getDaoIdDecodedOutput &&
                    !getDaoIdDecodedOutput.isError &&
                    getDaoIdDecodedOutput.value ? (
                      <>
                        {isAdmin
                          ? decodedOutput.value.map((project, index) => (
                              <Table.Row key={project.projectId}>
                                <span>{index + 1}</span>
                                <span>
                                  {' '}
                                  <Link
                                    href={`/project/${getDaoIdDecodedOutput.value}/${project.projectId}`}
                                  >
                                    <Button
                                      onClick={() => {
                                        console.log('logged');
                                      }}
                                    >
                                      {project.name}
                                    </Button>
                                  </Link>
                                </span>
                                <span>
                                  <Button
                                    onClick={() => {
                                      setSelectedProject(project);
                                      setUpdateModalOpen(true);
                                    }}
                                    startIcon={<AiOutlinePlus />}
                                  >
                                    {project.projectStatus}
                                  </Button>
                                </span>
                                <span>
                                  {new Date(
                                    parseInt(project.startTime)
                                  ).toDateString()}
                                </span>
                                <span>{project.creator}</span>
                                <span>{project.assignedTo}</span>
                                <span>{project.projectId}</span>
                                <span>{project.description}</span>
                              </Table.Row>
                            ))
                          : decodedOutputMembersProjects?.value.Ok.map(
                              (project, index) => (
                                <Table.Row key={project.projectId}>
                                  <span>{index + 1}</span>
                                  <span>
                                    {' '}
                                    <Link
                                      href={`/project/${getDaoIdDecodedOutput.value}/${project.projectId}`}
                                    >
                                      <Button
                                        onClick={() => {
                                          console.log('logged');
                                        }}
                                      >
                                        {project.name}
                                      </Button>
                                    </Link>
                                  </span>
                                  <span>
                                    <Button
                                      onClick={() => {
                                        setSelectedProject(project);
                                        setUpdateModalOpen(true);
                                      }}
                                      startIcon={<AiOutlinePlus />}
                                    >
                                      {project.projectStatus}
                                    </Button>
                                  </span>
                                  <span>
                                    {new Date(
                                      parseInt(project.startTime)
                                    ).toDateString()}
                                  </span>
                                  <span>{project.creator}</span>
                                  <span>{project.assignedTo}</span>
                                  <span>{project.projectId}</span>
                                  <span>{project.description}</span>
                                </Table.Row>
                              )
                            )}
                      </>
                    ) : (
                      'no data'
                    )}
                  </>
                )}
            </>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
