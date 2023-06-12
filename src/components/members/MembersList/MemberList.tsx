// import {Routes, Route, useNavigate,Link} from 'react-router-dom';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { IGetMembersList, useGetMemberList } from '@/hooks/messages';
import { useGetDaoId } from '@/hooks/messages/useGetDaoId';

import { CreateMember } from '@/components/members';
import Skeleton from '@/components/Skeleton';

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
            <Skeleton />
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
                              variant='primary'
                              className='transform rounded-md bg-gradient-to-r from-black via-gray-500 to-white px-4 py-2 text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:from-white hover:via-gray-500 hover:to-black hover:text-white'
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
