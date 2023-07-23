/* eslint-disable @next/next/no-img-element */
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  Dropdown,
  Navbar,
} from 'react-daisyui';
import { AiOutlineWallet } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';

import { removeFromLocalStorage } from '@/lib/helper';

import { navigation } from '@/components/layout/Layout';
import ThemeSwitch from '@/components/ThemeSwitch/ThemeSwitch';

import { LOCAL_STORAGE_ADDRESS_KEY } from '@/config';
import {
  useSubstrate,
  useSubstrateState,
} from '@/context/substrate/SubstrateContextProvider';
import { useUser } from '@/context/user/UserContextProvider';

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  const { setCurrentAccount } = useSubstrate();
  const { currentAccount } = useSubstrateState();

  const logout = () => {
    setCurrentAccount(null as unknown as KeyringAddress);
    removeFromLocalStorage(LOCAL_STORAGE_ADDRESS_KEY);
  };

  return (
    <div className='flex w-full items-center justify-center gap-2 p-4 font-sans'>
      <Navbar className='bg-base-100 rounded-box flex w-full items-center p-2 shadow-xl'>
        <div className='flex-1'>
          <label
            htmlFor='drawer'
            className='drawer-button btn btn-ghost text-xl normal-case'
          >
            <RxHamburgerMenu className='mr-2' /> felidaeDAO
          </label>
          <Breadcrumbs className='ml-4'>
            <Breadcrumbs.Item>DAO</Breadcrumbs.Item>

            <Breadcrumbs.Item>
              {navigation.find((page) => page.href === router.pathname)?.name}
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <>
          {currentAccount ? (
            <div className='flex items-center'>
              <ThemeSwitch />
              <Dropdown horizontal='left' vertical='bottom'>
                <Button
                  className='mx-2'
                  tabIndex={0}
                  color='ghost'
                  shape='circle'
                >
                  <AiOutlineWallet className='text-2xl' />
                </Button>
                <Dropdown.Menu
                  tabIndex={0}
                  className='card card-compact bg-base-100  mt-3 w-52 !p-0'
                >
                  <Card.Body className='card-body'>
                    <span className='text-lg font-bold'>8 Items</span>
                    <span className='text-info'>Subtotal: $999</span>
                    <Card.Actions>
                      <Button color='primary' fullWidth>
                        View balance
                      </Button>
                    </Card.Actions>
                  </Card.Body>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown horizontal='left' vertical='bottom'>
                <Avatar
                  className='cursor-pointer'
                  size='xs'
                  online
                  shape='circle'
                  border
                  borderColor='primary'
                  letters={user?.name[0]}
                />
                <Dropdown.Menu className='menu-compact w-52'>
                  <li>
                    <Link href='/profile' className='justify-between'>
                      Profile
                    </Link>
                  </li>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item role='button' onClick={logout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <Link className='link mr-5' href='/login'>
              Log in
            </Link>
          )}
        </>
      </Navbar>
    </div>
  );
}
