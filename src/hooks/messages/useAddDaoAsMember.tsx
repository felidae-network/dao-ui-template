import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { addDaoAsMemberInputSchema } from '@/helpers/schemas';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { AddDaoAsMemberInput } from '@/types/schemaTypes';

export const useAddDaoAsMember = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.ADD_DAO_AS_MEMBER
  );

  const queryInfo = useQuery<AddDaoAsMemberInput>(messageInfo, {
    mutate: true,
  });

  const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationError = await validateSchema(
      addDaoAsMemberInputSchema,
      queryInfo.argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    queryInfo.query(messageInfo);
  };

  return {
    ...queryInfo,
    mutate,
    schema: addDaoAsMemberInputSchema,
    validationErrors,
  };
};
