// import {Routes, Route, useNavigate,Link} from 'react-router-dom';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { IGetMembersList, useGetMemberList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { LoadingSpinner } from '@/components/loading/Loading';
import { CreateMember } from '@/components/members';

interface MemberListProps {
  children?: React.ReactNode;
}

export const MemberList: React.FC<MemberListProps> = () => {
  const { decodedOutput, loading } = useGetMemberList();
  const { decodedOutput: getDaoIdDecodedOutput, loading: getDaoIdLoading } =
    useGetDaoId();

  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  // const navigate = useNavigate();

  // This function navigates to the Home route.
  // const navigateHome = () => {
  //   navigate('/');
  // };

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
          {loading || getDaoIdLoading ? (
            <div className='flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {decodedOutput &&
              getDaoIdDecodedOutput &&
              getDaoIdDecodedOutput.value &&
              decodedOutput.value &&
              (decodedOutput.value as unknown as IGetMembersList).length ? (
                <>
                  {(decodedOutput.value as unknown as IGetMembersList).map(
                    (member, index) => (
                      <Table.Row key={member.memberId}>
                        <span>{index + 1}</span>
                        <span>
                          <Link
                            href={`/member/${getDaoIdDecodedOutput.value}/${member.memberId}`}
                          >
                            <Button
                              onClick={() => {
                                console.log('logged');
                              }}
                            >
                              {member.name}
                            </Button>
                          </Link>
                        </span>
                        <span>{member.memberStatus}</span>
                        <span>
                          {new Date(parseInt(member.startTime)).toDateString()}
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
