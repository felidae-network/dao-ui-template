import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Input, Modal } from 'react-daisyui';

import { useAddMember } from '@/hooks/messages';

interface CreateMemberProps {
  children?: React.ReactNode;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const CreateMember: React.FC<CreateMemberProps> = ({
  toggleVisible,
}) => {
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
          <Input
            name='name'
            className='w-full'
            placeholder='name'
            value={argValues.name}
            onChange={(e) =>
              setArgValues({ ...argValues, name: e.target.value })
            }
          />
        </Modal.Body>

        <Modal.Actions>
          <Button loading={loading} type='submit'>
            Yay!
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
