import { InferType } from 'yup';

import {
  addDaoAsMemberInputSchema,
  addDaoTokenInputSchema,
  addMemberInputSchema,
  calculateEfficiencyInputSchema,
  closeProjectInputSchema,
  closeTaskInputSchema,
  createProjectInputSchema,
  createTicketInputSchema,
  deleteMemberInputSchema,
  getMemberInfoInputSchema,
  getMemberListInputSchema,
  getProjectInputSchema,
  getStakeForAccountInputSchema,
  getTaskInfoInputSchema,
  getTokenListInputSchema,
  isAdminInputSchema,
  isMemberInputSchema,
  setCodeInputSchema,
  setDaoAdminInputSchema,
  timeLogInputSchema,
  updateMemberRoleInputSchema,
  updateProjectStatusInputSchema,
  updateTaskStatusInputSchema,
} from '@/helpers/schemas';

export type ADdMemberInput = InferType<typeof addMemberInputSchema>;
export type AddDaoTokenInput = InferType<typeof addDaoTokenInputSchema>;
export type GetTokenListInput = InferType<typeof getTokenListInputSchema>;
export type IsAdminInput = InferType<typeof isAdminInputSchema>;
export type DeleteMemberInput = InferType<typeof deleteMemberInputSchema>;
export type AddDaoAsMemberInput = InferType<typeof addDaoAsMemberInputSchema>;
export type GetMemberInfoInput = InferType<typeof getMemberInfoInputSchema>;
export type SetDaoAdminInput = InferType<typeof setDaoAdminInputSchema>;
export type IsMemberInput = InferType<typeof isMemberInputSchema>;
export type GetMemberListInput = InferType<typeof getMemberListInputSchema>;
export type UpdateMemberRoleInput = InferType<
  typeof updateMemberRoleInputSchema
>;
export type CreateProjectInput = InferType<typeof createProjectInputSchema>;
export type GetProjectInput = InferType<typeof getProjectInputSchema>;
export type UpdateProjectStatusInput = InferType<
  typeof updateProjectStatusInputSchema
>;
export type CloseProjectInput = InferType<typeof closeProjectInputSchema>;
export type CreateTicketInput = InferType<typeof createTicketInputSchema>;
export type UpdateTaskStatusInput = InferType<
  typeof updateTaskStatusInputSchema
>;
export type GetTaskInfoInput = InferType<typeof getTaskInfoInputSchema>;
export type CloseTaskInput = InferType<typeof closeTaskInputSchema>;
export type TimeLogInput = InferType<typeof timeLogInputSchema>;
export type CalculateEfficiencyInput = InferType<
  typeof calculateEfficiencyInputSchema
>;
export type GetStakeForAccountInput = InferType<
  typeof getStakeForAccountInputSchema
>;
export type SetCodeInput = InferType<typeof setCodeInputSchema>;
