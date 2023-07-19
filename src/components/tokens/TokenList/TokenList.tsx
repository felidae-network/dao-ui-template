import { useState } from 'react';
import { Button, Modal, Table } from 'react-daisyui';
import { AiOutlinePlus } from 'react-icons/ai';

import { useGetTokenList } from '@/hooks/messages/useGetTokenList';

import { LoadingSpinner } from '@/components/loading';
import { AddStake } from '@/components/tokens/StakeToken';
interface TokenListProps {
  children?: React.ReactNode;
}

export const TokenList: React.FC<TokenListProps> = () => {
  const { decodedOutput, loading, refetch } = useGetTokenList();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <div>
      {/* <Modal open={visible} onClickBackdrop={toggleVisible}>
        <AddToken toggleVisible={toggleVisible} />
      </Modal> */}
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <AddStake
          toggleVisible={() => setCreateModalOpen(!createModalOpen)}
          refetchStakes={() => refetch()}
        />
      </Modal>
      <div className='mb-3 flex items-center justify-between'>
        <h3>Token List</h3>
        <Button onClick={toggleVisible} startIcon={<AiOutlinePlus />}>
          Add New
        </Button>
      </div>

      <Table zebra={true} className='w-full'>
        <Table.Head>
          <span />
          <span>token type</span>
          <span>token Address</span>
        </Table.Head>

        <Table.Body>
          {loading ? (
            <div className='flex items-center justify-center'>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {decodedOutput &&
              decodedOutput.value &&
              !decodedOutput.isError &&
              decodedOutput.value.length ? (
                <>
                  {decodedOutput.value.map((token, index) => (
                    <Table.Row key={token.tokenType}>
                      <span>{index + 1}</span>
                      <span>{token.tokenType}</span>
                      {/* <span>
                          <Button
                            onClick={toggleVisible}
                            startIcon={<AiOutlinePlus />}
                          >
                            {project.projectStatus}
                          </Button>
                        </span>
                        <span>
                          {new Date(project.startTime).toDateString()}
                        </span> */}
                      {/* <span>{project.projectId}</span> */}
                      <span>{token.tokenAddress}</span>
                    </Table.Row>
                  ))}
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
