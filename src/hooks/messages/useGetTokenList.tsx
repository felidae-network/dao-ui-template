import { useQuery } from '@/hooks/useQuery';

import { useContract } from '@/context/contract/ContractContextProvider';

import { CONTRACT_MESSAGES } from '@/types/enums';
export interface IGetToken {
  tokenType: string;
  tokenAddress: string;
}

export type IGetTokenList = IGetToken[];
export const useGetTokenList = () => {
  const { contract } = useContract();
  // const [validationErrors, setValidationErrors] =
  //   useState<ValidationError | null>(null);

  const messageInfo = contract?.abi?.findMessage(
    CONTRACT_MESSAGES.GET_TOKEN_LIST
  );

  // const queryInfo = useQuery<GetTokenListInput>(messageInfo, { mutate: true });

  // const mutate = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const validationError = await validateSchema(
  //     getTokenListInputSchema,
  //     queryInfo.argValues
  //   );

  //   if (validationError) {
  //     return setValidationErrors(validationError);
  //   }

  // queryInfo.query(messageInfo);
  return useQuery(messageInfo);
};

// return {
//   ...queryInfo,
//   mutate,
//   schema: getTokenListInputSchema,
//   validationErrors,
// };
// };
