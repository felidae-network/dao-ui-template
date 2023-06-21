import { mixed, number, object, string } from 'yup';

import { MemberRoleEnum } from '@/types/enums';

export const addMemberInputSchema = object({
  daoAddress: string().required(),
  memberAddress: string().required(),
  name: string().optional(),
});

export const addDaoTokenInputSchema = object({
  daoAddress: string().required(),
  tokenType: string().required(),
  tokenAddress: string().required(),
});

export const getTokenListInputSchema = object({
  tokenAddress: string().required(),
});

export const isAdminInputSchema = object({
  admin: string().required(),
});

export const deleteMemberInputSchema = object({
  daoAddress: string().required(),
  memberAddress: string().required(),
});

export const addDaoAsMemberInputSchema = object({
  daoInfo: object({
    daoName: string().required(),
    description: string().required(),
    website: string().nullable(),
    profile: string().nullable(),
  }),
});

export const getMemberInfoInputSchema = object({
  memberId: number().required(),
});

export const setDaoAdminInputSchema = object({
  memberAddress: string().required(),
});

export const isMemberInputSchema = object({
  account: string().required(),
});

export const getMemberListInputSchema = object({
  daoAddress: string().required(),
});

export const updateMemberRoleInputSchema = object({
  daoAddress: string().required(),
  memberAddress: string().required(),
  role: mixed<MemberRoleEnum>()
    .oneOf(Object.values(MemberRoleEnum) as MemberRoleEnum[])
    .required(),
});

export const createProjectInputSchema = object({
  daoAddress: string().required(),
  assignedTo: string().required(),
  name: string().required(),
  projectDescription: string().required(),
});

export const getProjectInputSchema = object({
  projectId: string().required(),
});

export const updateProjectStatusInputSchema = object({
  projectId: string().required(),
  daoAddress: string().required(),
  status: string().required(),
});

export const closeProjectInputSchema = object({
  projectId: string().required(),
  daoAddress: string().required(),
});

export const createTicketInputSchema = object({
  name: string().required(),
  projectId: string().required(),
  assignedTo: string().required(),
  ticketType: string().required(),
});

export const updateTaskStatusInputSchema = object({
  daoAddress: string().required(),
  ticketId: string().required(),
  ticketStatus: string().required(),
});

export const getTaskInfoInputSchema = object({
  ticketId: string().required(),
});

export const closeTaskInputSchema = object({
  ticketId: string().required(),
  daoAddress: string().required(),
});

export const timeLogInputSchema = object({
  taskId: string().required(),
  daoAddress: string().required(),
  projectId: string().required(),
  time: string().required(),
});

export const calculateEfficiencyInputSchema = object({
  memberAddress: string().required(),
});

export const getStakeForAccountInputSchema = object({
  accountId: string().required(),
});

export const setCodeInputSchema = object({
  code: string().required(),
});

export const createSprintInputSchema = object({
  projectId: string().required(),
  startDate: string().required(),
  endDate: string().required(),
});
