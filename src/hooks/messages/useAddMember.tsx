import { InferType, object, string, ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';

const addMemberInputSchema = object({
  daoAddress: string().required(),
  memberAddress: string().required(),
  name: string().required(),
});

export type ADdMemberInput = InferType<typeof addMemberInputSchema>;

export const useAddMember = () => {
  const { contract } = useContract();

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.ADD_MEMBER);

  const queryInfo = useQuery<ADdMemberInput>(messageInfo, { mutate: true });

  const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addMemberInputSchema.validate(queryInfo.argValues);
    } catch (error: unknown) {
      const err = error as ValidationError;
      alert(err.message);
      return error;
    }

    console.log('pec pec');

    queryInfo.query(messageInfo);
  };

  return { ...queryInfo, mutate, schema: addMemberInputSchema };
};
