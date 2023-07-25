import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { addStakeInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { addStakeInput } from '@/types/schemaTypes';

export const useAddStake = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(CONTRACT_MESSAGES.ADD_STAKE);
  const queryInfo = useQuery<unknown, addStakeInput>(messageInfo, {
    mutate: true,
  });
  const mutate = async () => {
    const validationError = await validateSchema(
      addStakeInputSchema,
      queryInfo.argValues
    );

    if (validationError) {
      return setValidationErrors(validationError);
    }

    return await queryInfo.query(messageInfo);
  };

  return {
    ...queryInfo,
    mutate,
    schema: addStakeInputSchema,
    validationErrors,
  };
};
