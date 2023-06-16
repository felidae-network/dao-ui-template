import Link from 'next/link';
import * as React from 'react';
import { Divider, Menu } from 'react-daisyui';
import { AiFillProject, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { HiOutlineSupport } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TiTag } from 'react-icons/ti';

import { FooterComponent } from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const navigation = [
  { name: 'Dashboard', href: '/', current: true, icon: <MdOutlineDashboard /> },
  {
    name: 'Projects',
    href: '/projects',
    current: false,
    icon: <AiFillProject />,
  },
  {
    name: 'Members',
    href: '/members',
    current: false,
    icon: <AiOutlineUsergroupDelete />,
  },
  { name: 'Tickets', href: '/tickets', current: false, icon: <FaTasks /> },
  { name: 'Sprint', href: '/sprint', current: false, icon: <TiTag /> },
  { name: 'Token', href: '/token', current: false, icon: <HiOutlineSupport /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='drawer'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <Header />
        <div className='container m-auto min-h-screen py-10'>{children}</div>
        <FooterComponent />
      </div>
      <div className='drawer-side'>
        <label htmlFor='drawer' className='drawer-overlay'></label>

        <div className='bg-base-100 w-56 p-2 shadow-xl'>
          <div className='mt-3 flex-1'>
            <label
              htmlFor='drawer'
              className='drawer-button btn btn-ghost text-xl normal-case'
            >
              <RxHamburgerMenu className='mr-2' /> felidaeDAO
            </label>
          </div>
          <Divider />
          <Menu className=''>
            {navigation.map((navItem) => (
              <Menu.Item key={navItem.name}>
                <Link href={navItem.href}>
                  {navItem.icon}
                  {navItem.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
    </div>
  );
}
