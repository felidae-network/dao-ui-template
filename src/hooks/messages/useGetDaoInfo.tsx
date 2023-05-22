import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

export interface IGetDaoInfo {
  daoName: string;
  description: string;
  website: string | null;
  profile: string | null;
  daoAddress: string | null;
}

export const useGetDaoInfo = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage('getDaoInfo');

  return useQuery(messageInfo);
};
