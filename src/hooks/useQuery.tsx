import { useCallback, useMemo, useState } from 'react';
import { BN_ZERO } from 'src/helpers/bn';
import type {
  AbiMessage,
  Balance,
  ContractExecResult,
  ContractOptions,
  ISubmittableResult,
  QueryMessageProps,
} from 'src/types';

import { useStorageDepositLimit } from '@/hooks/useStorageDepositLimit';
import { useWeight } from '@/hooks/useWeight';

import { useContract } from '@/context/contract/ContractContextProvider';
import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import {
  decodeStorageDeposit,
  getGasLimit,
  getStorageDepositLimit,
} from '@/helpers/callOptions';

export const useQuery = () => {
  const { currentAccount, api } = useSubstrateState();
  const { callMessage, queryMessage, contract } = useContract();

  const [message, setMessage] = useState<AbiMessage>();
  const [outcome, setOutcome] = useState<ContractExecResult>(
    {} as ContractExecResult
  );
  const [result, setResult] = useState<ISubmittableResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const storageDepositLimit = useStorageDepositLimit(currentAccount?.address);
  const refTime = useWeight(outcome.gasRequired?.refTime.toBn());
  const proofSize = useWeight(outcome.gasRequired?.proofSize.toBn());

  const params: QueryMessageProps = useMemo(() => {
    return {
      currentAccountAddress: currentAccount.address,
      contractAddress: contract.address,
      balance: message?.isPayable
        ? api.registry.createType<Balance>('Balance', 1)
        : api.registry.createType<Balance>('Balance', BN_ZERO),
      gasLimit: getGasLimit(
        false,
        refTime.limit,
        proofSize.limit,
        api.registry
      ),
      storageDepositLimit: getStorageDepositLimit(
        false,
        storageDepositLimit.value,
        api.registry
      ),
      value: '',
    };
  }, [
    currentAccount,
    contract,
    message?.isPayable,
    proofSize.limit,
    refTime.limit,
    storageDepositLimit.value,
    api.registry,
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
          getGasLimit(false, refTime.limit, proofSize.limit, api.registry) ??
          gasRequired,
        storageDepositLimit: getStorageDepositLimit(
          false,
          userInput,
          api.registry,
          predictedStorageDeposit
        ),
        value: message?.isPayable ? params.balance : undefined,
      };

      await callMessage(message!, options, (res) => setResult(res));
    },
    [
      storageDepositLimit,
      callMessage,
      api.registry,
      params.balance,
      proofSize.limit,
      refTime.limit,
    ]
  );

  const query = async (message: AbiMessage) => {
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
  };

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
  };
};
