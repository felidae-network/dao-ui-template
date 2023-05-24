import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export const useAddMember = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.ADD_MEMBER);

  const queryInfo = useQuery(messageInfo, { mutate: true });

  const mutate = () => {
    // valudate queryInfo.argValues with yup
    queryInfo.query(messageInfo);
  };

  return { ...queryInfo, mutate };
};
