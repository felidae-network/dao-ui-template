// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useEffect, useMemo, useRef, useState } from 'react';

import { useSubstrateState } from '@/context/substrate/SubstrateContextProvider';
import { transformUserInput } from '@/helpers/callOptions';
import { getInitValue } from '@/helpers/initValue';

import { AbiMessage, AbiParam, Account, Registry, SetState } from '@/types';

function fromArgs<T>(
  registry: Registry,
  accounts: Account[],
  args: AbiParam[]
) {
  const result = {} as T;

  args?.forEach(({ name, type }) => {
    result[name as keyof T] = getInitValue(
      registry,
      accounts,
      type
    ) as T[keyof T];
  });

  return result;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useArgValues<T>(
  message: AbiMessage | undefined,
  registry: Registry,
  initialArgValues?: T
): [T, SetState<T>, Uint8Array | undefined] {
  const { accounts } = useSubstrateState();
  const [value, setValue] = useState<T>(
    accounts && message
      ? initialArgValues
        ? initialArgValues
        : fromArgs(registry, accounts, message.args)
      : ({} as T)
  );
  const argsRef = useRef(message?.args ?? []);

  const inputData = useMemo(() => {
    let data: Uint8Array | undefined;
    try {
      data = message?.toU8a(
        transformUserInput(registry, message.args, value as T)
      );
    } catch (e) {
      console.error(e);
    }
    return data;
  }, [value, registry, message]);

  useEffect((): void => {
    if (accounts && message && argsRef.current !== message.args) {
      setValue(fromArgs(registry, accounts, message.args));
      argsRef.current = message.args;
    }
  }, [accounts, message, registry]);

  return [value, setValue, inputData];
}
