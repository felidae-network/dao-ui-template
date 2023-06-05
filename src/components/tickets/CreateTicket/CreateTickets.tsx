import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';

import { useCreateTicket } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { TicketTypeEnum } from '@/types/enums/ticketType.enum';

interface CreateTicketProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateTicket: React.FC<CreateTicketProps> = ({
  toggleVisible,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues, decodedOutput } =
    useCreateTicket();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(e);
    alert(decodedOutput?.decodedOutput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Create Ticket</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Ticket Name</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='name'
            value={argValues.name}
            onChange={(e) =>
              setArgValues({ ...argValues, name: e.target.value })
            }
          />
          <label className='label'>
            <span className='label-text'>ticketType</span>
          </label>

          <Select
            placeholder='Account Address'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, ticketType: event.target.value })
            }
          >
            {Object.values(TicketTypeEnum).map((ticketType) => (
              <option key={ticketType}>{ticketType}</option>
            ))}
          </Select>

          <label className='label'>
            <span className='label-text'>Choose member account</span>
          </label>
          <Select
            placeholder='Account Address'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, assignedTo: event.target.value })
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
            <span className='label-text'>ProjectId</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='ProjectId'
            value={argValues.projectId}
            onChange={(e) =>
              setArgValues({ ...argValues, projectId: e.target.value })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Ticket!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
