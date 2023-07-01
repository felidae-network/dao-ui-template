// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { useMemo, useState } from 'react';

import { transformUserInput } from '@/helpers/callOptions';

import { AbiMessage, Registry, SetState } from '@/types';

// function fromArgs<T>(
//   registry: Registry,
//   accounts: Account[],
//   args: AbiParam[]
// ) {
//   const result = {} as T;

//   args?.forEach(({ name, type }) => {
//     result[name as keyof T] = getInitValue(
//       registry,
//       accounts,
//       type
//     ) as T[keyof T];
//   });

//   return result;
// }

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useArgValues<T>(
  message: AbiMessage | undefined,
  registry: Registry,
  initialArgValues?: T
): [T, SetState<T>, Uint8Array | undefined] {
  const [value, setValue] = useState<T>(initialArgValues || ({} as T));

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

  return [value, setValue, inputData];
}
