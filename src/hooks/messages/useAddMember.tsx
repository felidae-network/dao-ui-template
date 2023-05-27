import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { addMemberInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { ADdMemberInput } from '@/types/schemaTypes';

export const useAddMember = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.ADD_MEMBER);

  const queryInfo = useQuery<ADdMemberInput>(messageInfo, { mutate: true });

  const mutate = async () => {
    const validationError = await validateSchema(
      addMemberInputSchema,
      queryInfo.argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    await queryInfo.query(messageInfo);
  };

  return {
    ...queryInfo,
    mutate,
    schema: addMemberInputSchema,
    validationErrors,
  };
};
