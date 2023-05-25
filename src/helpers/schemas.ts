import { object, string } from 'yup';

export const addMemberInputSchema = object({
  daoAddress: string().required(),
  memberAddress: string().required(),
  name: string().required(),
});
