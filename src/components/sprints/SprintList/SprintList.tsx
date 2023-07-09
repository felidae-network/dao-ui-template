import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { useGetProjectList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { LoadingSpinner } from '@/components/loading';
import { CreateProject } from '@/components/projects/CreateProject';
interface SprintListProps {
  children?: React.ReactNode;
}

export const SprintList: React.FC<SprintListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetProjectList();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  // const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();
  // const [selectedProject, setSelectedProject] = useState<IGetProject>();

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
      {/* {selectedProject && (
        // <Modal
        //   open={updateModalOpen}
        //   onClickBackdrop={() => setUpdateModalOpen(false)}
        // >
        //   <UpdateProjectStatus
        //     toggleVisible={() => setUpdateModalOpen(!updateModalOpen)}
        //     refetchProjects={() => refetch()}
        //     project={selectedProject!}
        //   />
        // </Modal>
      )} */}
      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Sprints</h3>
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
          <span>Sprint</span>
          <span>Start Date</span>
          <span>End Date</span>
          <span>Action</span>
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
                        {`Sprint_${new Date(
                          parseInt(project.sprint.startDate)
                        ).toDateString()}_${new Date(
                          parseInt(project.sprint.endDate)
                        ).toDateString()}`}
                      </span>
                      <span>
                        {new Date(
                          parseInt(project.sprint.startDate)
                        ).toDateString()}
                      </span>
                      <span>
                        {new Date(
                          parseInt(project.sprint.endDate)
                        ).toDateString()}
                      </span>
                      <span>{project.sprint.action}</span>
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
