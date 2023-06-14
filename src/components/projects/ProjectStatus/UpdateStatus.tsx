import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';

import { useUpdateProjectStatus } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

import { ProjectStatusEnum } from '@/types/enums';
interface UpdateProjectStatusProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const UpdateProjectStatus: React.FC<UpdateProjectStatusProps> = ({
  toggleVisible,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues, decodedOutput } =
    useUpdateProjectStatus();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate(e);
    alert(decodedOutput?.decodedOutput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Update Project Status</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Project Id</span>
          </label>
          <Input
            name='name'
            className='w-full'
            placeholder='name'
            value={argValues.projectId}
            onChange={(e) =>
              setArgValues({ ...argValues, projectId: e.target.value })
            }
          />
          <label className='label'>
            <span className='label-text'>Choose member account</span>
          </label>
          <Select
            placeholder='Account Address'
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
            <span className='label-text'>Project Description</span>
          </label>
          <Select
            placeholder='Status'
            className='w-full'
            onChange={(event) =>
              setArgValues({ ...argValues, status: event.target.value })
            }
          >
            {Object.values(ProjectStatusEnum).map((ticketType) => (
              <option key={ticketType}>{ticketType}</option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Update Project Status
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
