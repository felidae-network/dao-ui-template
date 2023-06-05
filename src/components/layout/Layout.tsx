import Link from 'next/link';
import * as React from 'react';
import { Menu } from 'react-daisyui';
import { AiFillProject, AiOutlineUsergroupDelete } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

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
  { name: 'Sprint', href: '/sprint', current: false, icon: <FaTasks /> },
  { name: 'Token', href: '/token', current: false, icon: <FaTasks /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='drawer'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <Header />
        <div className='container m-auto'>{children}</div>
      </div>
      <div className='drawer-side'>
        <label htmlFor='drawer' className='drawer-overlay'></label>

        <Menu className='bg-base-100 w-56 p-2 shadow-xl'>
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
  );
}
