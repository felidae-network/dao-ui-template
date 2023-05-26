import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { IGetProjectList, useGetProjectList } from '@/hooks/messages';

import { CreateProject } from '@/components/projects/CreateProject';
import Skeleton from '@/components/Skeleton';

interface ProjectListProps {
  children?: React.ReactNode;
}

export const ProjectList: React.FC<ProjectListProps> = () => {
  const { decodedOutput, loading } = useGetProjectList();
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <CreateProject toggleVisible={toggleVisible} />
      </Modal>

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Projects</h3>
        <Button onClick={toggleVisible} startIcon={<AiOutlinePlus />}>
          Add New
        </Button>
      </div>

      <Table zebra={true} className='w-full'>
        <Table.Head>
          <span />
          <span>Name</span>
          <span>Status</span>
          <span>Created At</span>
        </Table.Head>

        <Table.Body>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {decodedOutput &&
              (decodedOutput.value as unknown as IGetProjectList).length ? (
                <>
                  {(decodedOutput.value as unknown as IGetProjectList).map(
                    (project, index) => (
                      <Table.Row key={project.projectId}>
                        <span>{index + 1}</span>
                        <span>{project.name}</span>
                        <span>{project.projectStatus}</span>
                        <span>
                          {new Date(project.startTime).toDateString()}
                        </span>
                      </Table.Row>
                    )
                  )}
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
