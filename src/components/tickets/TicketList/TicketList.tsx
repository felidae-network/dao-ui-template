import Link from 'next/link';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { useGetAdmin } from '@/hooks/messages';
import { useGetMemberInfoByAddress } from '@/hooks/messages/useGetMemberInfoByAddress';
import {
  IGetTicket,
  IGetTicketList,
  useGetTicketList,
} from '@/hooks/messages/useGetTicketList';
import { useGetMembersTicket } from '@/hooks/useGetMembersTicketList';

import { LoadingSpinner } from '@/components/loading';
import { CreateTicket } from '@/components/tickets/CreateTicket';
import { UpdateTicketStatus } from '@/components/tickets/TicketStatus';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { useUser } from '@/context/user/UserContextProvider';

interface TicketListProps {
  children?: React.ReactNode;
}

export const TicketList: React.FC<TicketListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetTicketList();
  const [createTicketModalVisible, setCreateTicketModalVisible] =
    useState(false);
  const [updateTicketModalVisible, setUpdateTicketModalVisible] =
    useState(false);
  const { user } = useUser();
  const { loading: getAdminLoading, decodedOutput: getAdminDecodedOutput } =
    useGetAdmin();
  console.log('getAdminLoading', getAdminLoading);

  const { currentAccount, api } = useSubstrateState();
  console.log('api', api);

  const isAdmin = getAdminDecodedOutput?.value == currentAccount?.address;
  const {
    loading: getMemberInfoloading,
    decodedOutput: decodedOutputMembersInfo,
  } = useGetMemberInfoByAddress({ memberAddress: currentAccount?.address });
  console.log('decodedOutputMembersInfo', decodedOutputMembersInfo?.value.Ok);
  console.log('getMemberInfoloading', getMemberInfoloading);
  const [selectedTicket, setSelectedTicket] = useState<IGetTicket>();
  const {
    loading: getMembersTicketListLoading,
    decodedOutput: getMembersTicketListdecodeOutput,
  } = useGetMembersTicket({
    memberId: user?.memberId as unknown as number,
  });
  console.log('useget', user?.memberId as unknown as number);
  console.log(
    'getMembersTicketListdecodeOutput',
    getMembersTicketListdecodeOutput?.value.Ok
  );
  console.log('user', user);
  console.log('isAdmin', isAdmin);

  let ticketListToMap: IGetTicketList | undefined;
  if (isAdmin) {
    ticketListToMap = decodedOutput?.value as unknown as IGetTicketList;
  } else {
    ticketListToMap = getMembersTicketListdecodeOutput?.value.Ok;
  }
  console.log('ticketmap', ticketListToMap);
  return (
    <div>
      <Modal
        open={createTicketModalVisible}
        onClickBackdrop={() => setCreateTicketModalVisible(!false)}
      >
        <CreateTicket
          toggleVisible={() =>
            setCreateTicketModalVisible(!createTicketModalVisible)
          }
          refetchTickets={() => refetch()}
        />
      </Modal>
      {selectedTicket && (
        <Modal
          open={updateTicketModalVisible}
          onClickBackdrop={() => {
            setUpdateTicketModalVisible(false);
            setSelectedTicket(undefined);
          }}
        >
          <UpdateTicketStatus
            ticket={selectedTicket!}
            toggleVisible={() => {
              setUpdateTicketModalVisible(!updateTicketModalVisible);
              setSelectedTicket(undefined);
            }}
            refetchTickets={() => refetch()}
          />
        </Modal>
      )}
      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Tickets</h3>
        <Button
          onClick={() => setCreateTicketModalVisible(true)}
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
          <span>Ticket Id</span>
          <span>Ticket Type</span>
        </Table.Head>

        <Table.Body>
          {loading && getMembersTicketListLoading ? (
            <div className='flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {ticketListToMap && ticketListToMap.length ? (
                <>
                  {(ticketListToMap as unknown as IGetTicketList).map(
                    (ticket, index) => (
                      <Table.Row key={ticket.ticketId}>
                        <span>{index + 1}</span>
                        <span>
                          <Link href={`/ticket/${ticket.ticketId}`}>
                            <Button
                              onClick={() => {
                                console.log('logged');
                              }}
                            >
                              {ticket.name}
                            </Button>
                          </Link>
                        </span>
                        <span>
                          {' '}
                          <Button
                            onClick={() => {
                              setSelectedTicket(ticket);
                              setUpdateTicketModalVisible(true);
                            }}
                            startIcon={<AiOutlinePlus />}
                          >
                            {ticket.ticketStatus}
                          </Button>
                        </span>
                        <span>
                          {new Date(parseInt(ticket.startTime)).toDateString()}
                        </span>
                        <span>{ticket.ticketId}</span>
                        <span>{ticket.taskType}</span>
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
