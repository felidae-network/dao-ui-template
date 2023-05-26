import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

export interface IGetProject {
  projectId: string;
  name: string;
  creator: string | null;
  projectStatus: string | null;
  assignedTo: string | null;
  startTime: string;
  endTime: null;
  taskList: [unknown];
  sprint: {
    projectId: string;
    startDate: string;
    endDate: string;
    action: string;
  };
}
export type IGetProjectList = IGetProject[];

export const useGetProjectList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_PROJECT_LIST
  );

  return useQuery(messageInfo);
};
