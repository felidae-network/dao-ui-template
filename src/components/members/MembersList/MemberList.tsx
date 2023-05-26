import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { useGetMemberList } from '@/hooks/messages';

import { CreateMember } from '@/components/members';
import Skeleton from '@/components/Skeleton';

interface MemberListProps {
  children?: React.ReactNode;
}

export const MemberList: React.FC<MemberListProps> = () => {
  const { decodedOutput, loading } = useGetMemberList();
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <CreateMember toggleVisible={toggleVisible} />
      </Modal>

      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Members</h3>
        <Button onClick={toggleVisible} startIcon={<AiOutlinePlus />}>
          Add New
        </Button>
      </div>

      <Table zebra={true} className='w-full'>
        <Table.Head>
          <span />
          <span>Name</span>
          <span>Job</span>
          <span>Favorite Color</span>
        </Table.Head>

        <Table.Body>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {decodedOutput && decodedOutput.value ? (
                <>
                  <Table.Row>
                    <span>1</span>
                    <span>Cy Ganderton</span>
                    <span>Quality Control Specialist</span>
                    <span>Blue</span>
                  </Table.Row>

                  <Table.Row>
                    <span>2</span>
                    <span>Hart Hagerty</span>
                    <span>Desktop Support Technician</span>
                    <span>Purple</span>
                  </Table.Row>

                  <Table.Row>
                    <span>3</span>
                    <span>Brice Swyre</span>
                    <span>Tax Accountant</span>
                    <span>Red</span>
                  </Table.Row>
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
