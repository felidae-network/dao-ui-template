import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  IGetTicketList,
  useGetTicketList,
} from '@/hooks/messages/useGetTicketList';

import Skeleton from '@/components/Skeleton';
import { CreateTicket } from '@/components/tickets/CreateTicket';
import { UpdateTicketStatus } from '@/components/tickets/TicketStatus';
interface TicketListProps {
  children?: React.ReactNode;
}

export const TicketList: React.FC<TicketListProps> = () => {
  const { decodedOutput, loading } = useGetTicketList();
  const [visible, setVisible] = useState<boolean>(false);
  console.log('are bgh', decodedOutput);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <CreateTicket toggleVisible={toggleVisible} />
      </Modal>
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <UpdateTicketStatus toggleVisible={toggleVisible} />
      </Modal>
      <div className='mb-3 flex items-center justify-between'>
        <h3>Your Tickets</h3>
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
          <span>Ticket Id</span>
          <span>Ticket Type</span>
        </Table.Head>

        <Table.Body>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              {decodedOutput &&
              decodedOutput.value &&
              (decodedOutput.value as unknown as IGetTicketList).length ? (
                <>
                  {(decodedOutput.value as unknown as IGetTicketList).map(
                    (ticket, index) => (
                      <Table.Row key={ticket.ticketId}>
                        <span>{index + 1}</span>
                        <span>{ticket.name}</span>
                        <span>
                          {' '}
                          <Button
                            onClick={toggleVisible}
                            startIcon={<AiOutlinePlus />}
                          >
                            {ticket.ticketStatus}
                          </Button>
                        </span>
                        <span>{new Date(ticket.startTime).toDateString()}</span>
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
