import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal, Select } from 'react-daisyui';

import { useAddMember } from '@/hooks/messages';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';

interface CreateMemberProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateMember: React.FC<CreateMemberProps> = ({
  toggleVisible,
}) => {
  const { accounts } = useSubstrateState();
  const { loading, mutate, argValues, setArgValues, decodedOutput } =
    useAddMember();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutate();
    alert(decodedOutput?.decodedOutput);
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Create Member</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Member Name</span>
            {/* <span className='label-text-alt'>Alt label</span> */}
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
              setArgValues({ ...argValues, memberAddress: event.target.value })
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
            Add Member!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
