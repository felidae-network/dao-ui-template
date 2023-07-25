import { FormEvent, useEffect, useState } from 'react';
import { Button, Collapse, Select } from 'react-daisyui';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';

import { useTimeLog } from '@/hooks/messages';
import { IGetTicket } from '@/hooks/messages/useGetTicketList';

interface TimeLogAccordionProps {
  ticket: IGetTicket;
}

export const TimeLogAccordion: React.FC<TimeLogAccordionProps> = ({
  ticket,
}) => {
  const { mutate, setArgValues, loading } = useTimeLog();
  const [ticketId, setticketId] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    setArgValues((prevState) => ({
      ...prevState,
      ticketId: ticketId,
      hours: hours,
      minutes: minutes,
    }));
  }, [hours, minutes, ticketId, setArgValues]);

  const handleLogTime = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mutateValue = await mutate(e);
    if (mutateValue) {
      if (mutateValue.isError)
        return toast.error(mutateValue.decodedOutput || 'Something went wrong');

      toast.success('Time logged');
    }
  };

  return (
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

            <div className='w-1/2'>
              <label className='label'>
                <span className='label-text'>ticketId</span>
              </label>
              <Select
                color='info'
                placeholder='Ticket Type'
                className='w-full'
                defaultValue={0}
                value={ticketId}
                onChange={() =>
                  setticketId(ticket.ticketId as unknown as number)
                }
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
  );
};
