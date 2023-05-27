import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';

import { useCreateProject } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

interface CreateProjectProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateProject: React.FC<CreateProjectProps> = ({
  toggleVisible,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues, decodedOutput } =
    useCreateProject();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    alert(decodedOutput?.decodedOutput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Create Project</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Project Name</span>
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
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Add Project!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
