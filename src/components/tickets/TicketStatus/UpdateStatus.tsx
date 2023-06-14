import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';

import { useUpdateTaskStatus } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { TaskStatusEnum } from '@/types/enums/taskStatus.enum';
interface UpdateTicketStatusProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const UpdateTicketStatus: React.FC<UpdateTicketStatusProps> = ({
  toggleVisible,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues, decodedOutput } =
    useUpdateTaskStatus();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(e);
    alert(decodedOutput?.decodedOutput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Update Ticket Status</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Ticket Id</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='name'
            value={argValues.ticketId}
            onChange={(e) =>
              setArgValues({ ...argValues, ticketId: e.target.value })
            }
          />
          <label className='label'>
            <span className='label-text'>dao address</span>
          </label>
          <Select
            placeholder='dao Address'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, daoAddress: event.target.value })
            }
          >
            {accounts &&
              accounts.map((account) => (
                <option key={account.address} value={account.address}>
                  {account.meta.name}
                </option>
              ))}
          </Select>

          <label className='label'>
            <span className='label-text'> Status</span>
          </label>
          <Select
            placeholder='Status'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, ticketStatus: event.target.value })
            }
          >
            {Object.values(TaskStatusEnum).map((ticketType) => (
              <option key={ticketType}>{ticketType}</option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Update Ticket Status
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
