import { ApiPromise } from '@polkadot/api';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { keyring as Keyring } from '@polkadot/ui-keyring';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { createContext } from 'react';

import { CUSTOM_RPC_METHODS, PROVIDER_SOCKET } from '@/config';

const connectedSocket = PROVIDER_SOCKET;

export const initialState: SubstrateState = {
  // These are the states
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, CUSTOM_RPC_METHODS },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null,
  accounts: [],
};

export interface SubstrateState {
  [key: string]: unknown;
  socket: string;
  jsonrpc: unknown;
  keyring: typeof Keyring | null;
  keyringState: string | null;
  api: ApiPromise | null;
  apiError: string | null;
  apiState: string | null;
  accounts: KeyringAddress[] | null;
  currentAccount: KeyringAddress | null;
}

export interface SubstrateContextType {
  state: SubstrateState;
  setCurrentAccount: (account: KeyringAddress) => void;
}

const SubstrateContextValues: SubstrateContextType = {
  state: initialState,
  setCurrentAccount: () => null,
};

export const SubstrateContext = createContext<SubstrateContextType>(
  SubstrateContextValues
);
