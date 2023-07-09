import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { IGetProject, useGetProjectList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { LoadingSpinner } from '@/components/loading';
import { CreateProject } from '@/components/projects/CreateProject';
import { UpdateProjectStatus } from '@/components/projects/ProjectStatus';
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
          <span>ProjectId</span>
          <span>Description</span>
        </Table.Head>

        <Table.Body>
          {loading && getDaoIdLoading ? (
            <div className='flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {decodedOutput &&
              decodedOutput.value &&
              !decodedOutput.isError &&
              decodedOutput.value.length &&
              getDaoIdDecodedOutput &&
              !getDaoIdDecodedOutput.isError &&
              getDaoIdDecodedOutput.value ? (
                <>
                  {decodedOutput.value.map((project, index) => (
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
                        {new Date(parseInt(project.startTime)).toDateString()}
                      </span>
                      <span>{project.projectId}</span>
                      <span>{project.description}</span>
                    </Table.Row>
                  ))}
                </>
              ) : (
                'no data'
              )}
            </>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
