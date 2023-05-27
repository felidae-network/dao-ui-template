import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { IGetMembersList, useGetMemberList } from '@/hooks/messages';

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
          <span>Status</span>
          <span>Created At</span>
        </Table.Head>

        <Table.Body>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {decodedOutput &&
              decodedOutput.value &&
              (decodedOutput.value as unknown as IGetMembersList).length ? (
                <>
                  {(decodedOutput.value as unknown as IGetMembersList).map(
                    (member, index) => (
                      <Table.Row key={member.memberId}>
                        <span>{index + 1}</span>
                        <span>{member.name}</span>
                        <span>{member.memberStatus}</span>
                        <span>{new Date(member.startTime).toDateString()}</span>
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
