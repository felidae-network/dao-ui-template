import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES, MemberRoleEnum } from '@/types/enums';
import { GetMemberListInput } from '@/types/schemaTypes';

export interface IGetMember {
  endTime: string | null;
  memberEfficiency: string;
  memberId: string;
  memberRole: MemberRoleEnum;
  memberStatus: string;
  name: string;
  projectList: [unknown];
  startTime: string;
  taskList: [unknown];
}

export type IGetMembersList = IGetMember[];

export const useGetMemberList = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_MEMBER_LIST
  );

  return useQuery<GetMemberListInput>(messageInfo, {
    initialArgValues: { daoAddress: contract.address?.toString() },
  });
};
