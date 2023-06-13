import { useCallback, useEffect, useMemo, useState } from 'react';
import { BN_ZERO } from 'src/helpers/bn';
import type {
  AbiMessage,
  Balance,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from 'src/types';

import { useArgValues } from '@/hooks/useArgValues';
import { useStorageDepositLimit } from '@/hooks/useStorageDepositLimit';
import { useWeight } from '@/hooks/useWeight';

import { useContract } from '@/context/contract/ContractContextProvider';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { getDecodedOutput } from '@/helpers/api/output';
import {
  decodeStorageDeposit,
  getGasLimit,
  getStorageDepositLimit,
} from '@/helpers/callOptions';

type QueryOptions<T> = {
  mutate?: boolean;
  initialArgValues?: T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useQuery<DecodedValueType = unknown, ArgValueType = unknown>(
  argMessage?: AbiMessage,
  queryOptions: QueryOptions<ArgValueType> = { mutate: false }
) {
  const { currentAccount, api } = useSubstrateState();
  const { callMessage, queryMessage, contract } = useContract();

  const [message, setMessage] = useState<AbiMessage>();
  const [outcome, setOutcome] = useState<ContractExecResult>(
    {} as ContractExecResult
  );
  const [result, setResult] = useState<ISubmittableResult>();
  const [argValues, setArgValues, inputData] = useArgValues<ArgValueType>(
    message,
    api?.registry
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const storageDepositLimit = useStorageDepositLimit(currentAccount?.address);
  const refTime = useWeight(outcome.gasRequired?.refTime.toBn());
  const proofSize = useWeight(outcome.gasRequired?.proofSize.toBn());
  const isCustom = refTime.mode === 'custom' || proofSize.mode === 'custom';

  const decodedOutput = useMemo(() => {
    if (message && Object.keys(outcome).length && contract?.abi?.registry) {
      return getDecodedOutput<DecodedValueType>(
        outcome,
        message,
        contract.abi.registry
      );
    }
  }, [message, outcome, contract]);

  const params: QueryMessageProps = useMemo(() => {
    return {
      currentAccountAddress: currentAccount?.address,
      contractAddress: contract.address?.toString(),
      balance: message?.isPayable
        ? api.registry.createType<Balance>('Balance', 1)
        : api.registry.createType<Balance>('Balance', BN_ZERO),
      gasLimit: getGasLimit(
        isCustom,
        refTime.limit,
        proofSize.limit,
        api.registry
      ),
      storageDepositLimit: getStorageDepositLimit(
        false,
        storageDepositLimit.value,
        api.registry
      ),
      value: inputData ?? '',
    };
  }, [
    currentAccount,
    contract,
    proofSize.limit,
    refTime.limit,
    storageDepositLimit.value,
    api.registry,
    isCustom,
    inputData,
    message,
  ]);

  const dryRun = useCallback(async () => {
    const o = await queryMessage(params);
    setOutcome(o);
    return o;
  }, [queryMessage, params]);

  const call = useCallback(
    async (message: AbiMessage, outcome: ContractExecResult) => {
      if (!message) return setError({ message: 'Message was not selected' });
      const { storageDeposit, gasRequired } = outcome;
      const { value: userInput } = storageDepositLimit;
      const predictedStorageDeposit = decodeStorageDeposit(storageDeposit);

      const options: ContractOptions = {
        gasLimit:
          getGasLimit(isCustom, refTime.limit, proofSize.limit, api.registry) ??
          gasRequired,
        storageDepositLimit: getStorageDepositLimit(
          false,
          userInput,
          api.registry,
          predictedStorageDeposit
        ),
        value: message?.isPayable ? params.balance : undefined,
      };

      await callMessage<ArgValueType>(message!, options, argValues, (res) =>
        setResult(res)
      );
    },
    [
      storageDepositLimit,
      callMessage,
      api.registry,
      params,
      proofSize.limit,
      refTime.limit,
      isCustom,
      argValues,
    ]
  );

  const query = useCallback(
    async (message: AbiMessage) => {
      setMessage(message);
      setLoading(true);

      try {
        const o = await dryRun();
        await call(message, o);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [call, dryRun]
  );

  useEffect(() => {
    if (argMessage && contract.abi) {
      setMessage(argMessage);
    }
  }, [argMessage, contract.abi]);

  useEffect(() => {
    if (message && !queryOptions.mutate) {
      query(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, queryOptions.mutate]);

  return {
    outcome,
    result,
    loading,
    error,
    storageDepositLimit,
    refTime,
    proofSize,
    message,
    setMessage,
    query,
    decodedOutput,
    argValues,
    setArgValues,
    inputData,
  };
}
