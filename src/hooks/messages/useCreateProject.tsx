import { useState } from 'react';
import { ValidationError } from 'yup';

import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';
import { createProjectInputSchema } from '@/helpers/schemas';
import { validateSchema } from '@/helpers/validateSchema';

import { CONTRACT_MESSAGES } from '@/types/enums';
import { CreateProjectInput } from '@/types/schemaTypes';

export const useCreateProject = () => {
  const { contract } = useContract();
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.CREATE_PROJECT
  );

  const queryInfo = useQuery<CreateProjectInput>(messageInfo, { mutate: true });

  const mutate = async () => {
    const validationError = await validateSchema(
      createProjectInputSchema,
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
    schema: createProjectInputSchema,
    validationErrors,
  };
};
