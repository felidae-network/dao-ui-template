import { Dispatch, FormEvent, SetStateAction } from 'react';
import { Button, Modal, Select } from 'react-daisyui';
import { TfiCup } from 'react-icons/tfi';

interface SetConfidenceProps {
  toggleVisible: Dispatch<SetStateAction<boolean>>;
}

export const SetConfidence: React.FC<SetConfidenceProps> = ({
  toggleVisible,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle hook
    toggleVisible(false);
  };

  return (
    <>
      <Modal.Header className='font-bold'>Set Confidence</Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <label className='label'>
            <span className='label-text'>Confidence level</span>
          </label>

          <Select placeholder='Ticket Type' className='w-full'>
            {[...new Array(10)].map((_, index) => (
              <option value={index + 1} key={index}>
                {index + 1}
              </option>
            ))}
          </Select>
        </Modal.Body>

        <Modal.Actions>
          <Button startIcon={<TfiCup />} type='submit'>
            Set Confidence
          </Button>
        </Modal.Actions>
      </form>
    </>
  );
};
