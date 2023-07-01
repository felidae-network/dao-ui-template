import { FormEvent, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Collapse,
  Divider,
  Modal,
  Progress,
  Select,
} from 'react-daisyui';
import toast from 'react-hot-toast';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

import { useTimeLog } from '@/hooks/messages';
import { IGetTicket } from '@/hooks/messages/useGetTicketList';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { TaskStatusEnum } from '@/types/enums/taskStatus.enum';
interface TicketModalProps {
  children?: React.ReactNode;
  ticket: IGetTicket;
  closeModal: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  ticket,
  closeModal,
}) => {
  const { currentAccount } = useSubstrateState();
  const { mutate, setArgValues, loading } = useTimeLog({
    taskId: Number(ticket.ticketId),
    time: 0,
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    setArgValues((prevState) => ({ ...prevState, time: hours * 60 + minutes }));
  }, [hours, minutes, setArgValues]);

  const handleLogTime = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mutateValue = await mutate();
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'Something went wrong');

      toast.success('Time logged');
    }
  };

  return (
    <>
      <Modal.Header>
        <div className='flex items-center justify-between font-bold'>
          <div>
            <Badge size='lg' className='mr-2' color='info'>
              D-12
            </Badge>
            <Badge size='lg'>
              {' '}
              {new Date(parseInt(ticket.startTime)).toDateString()}
            </Badge>
          </div>

          <Button
            onClick={closeModal}
            startIcon={<AiOutlineClose />}
            size='sm'
          />
        </div>

        <div className='mt-5 flex items-center justify-between text-sm'>
          <h5 className='text-md flex items-center gap-2'>
            Reporter:
            <Badge color='ghost' size='lg'>
              {ticket.creator}
            </Badge>
          </h5>
          <h5 className='text-md flex items-center gap-2'>
            Reporter:
            <Badge color='ghost' size='lg'>
              {ticket.assignedTo}
            </Badge>
          </h5>
        </div>
      </Modal.Header>
      <Divider />
      <Modal.Body>
        <div className='flex'>
          <div className='w-2/3 pr-4'>
            <h3 className='mb-2'>{ticket.name}</h3>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
          </div>
          <div className='w-1/3'>
            <div>
              <label className='label'>
                <span className='label-text font-bold'>STATUS</span>
              </label>
              <Select color='info' placeholder='Ticket Type' className='w-full'>
                {Object.keys(TaskStatusEnum).map((ticketType) => (
                  <option value={ticketType} key={ticketType}>
                    {ticketType}
                  </option>
                ))}
              </Select>
            </div>
            <div className='mt-10'>
              <label className='label'>
                <span className='label-text font-bold'>TIME TRACKING</span>
              </label>
              <div className='flex items-center'>
                <AiOutlineClockCircle className='mr-2 text-4xl' />
                <div className='w-full'>
                  <Progress color='info' className='my-0 w-full' value={100} />
                  <p className='text-sm opacity-75'>4d 3h 30m logged in</p>
                </div>
              </div>

              {currentAccount.address === ticket.assignedTo && (
                <Collapse open={collapse} checkbox icon='arrow'>
                  <Collapse.Title
                    onClick={() => setCollapse(!collapse)}
                    className='bg-base-300 my-3 mb-0 cursor-pointer rounded rounded-b-none'
                  >
                    LOG TIME
                  </Collapse.Title>
                  <Collapse.Content className='bg-base-200 rounded rounded-t-none'>
                    <form onSubmit={handleLogTime}>
                      <div className='flex w-full gap-2'>
                        <div className='w-1/2'>
                          <label className='label'>
                            <span className='label-text'>HOURS</span>
                          </label>
                          <Select
                            color='info'
                            placeholder='Ticket Type'
                            className='w-full'
                            defaultValue={0}
                            value={hours}
                            onChange={(e) => setHours(Number(e.target.value))}
                          >
                            {[...new Array(25)].map((_, index) => (
                              <option value={index} key={index}>
                                {index}
                              </option>
                            ))}
                          </Select>
                        </div>

                        <div className='w-1/2'>
                          <label className='label'>
                            <span className='label-text'>MINUTES</span>
                          </label>
                          <Select
                            color='info'
                            placeholder='Ticket Type'
                            className='w-full'
                            defaultValue={0}
                            value={minutes}
                            onChange={(e) => setMinutes(Number(e.target.value))}
                          >
                            {[...new Array(61)].map((_, index) => (
                              <option value={index} key={index}>
                                {index}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <Button
                        className='mt-3 w-full'
                        type='submit'
                        startIcon={<AiOutlinePlus />}
                        loading={loading}
                      >
                        LOG
                      </Button>
                    </form>
                  </Collapse.Content>
                </Collapse>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Actions></Modal.Actions>
    </>
  );
};
