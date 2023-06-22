import React from 'react';
import { Button, Dropdown } from 'react-daisyui';
import { BiBrush } from 'react-icons/bi';

import { useTheme } from '@/context/theme/ThemeContextProvider';

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Dropdown horizontal='left' vertical='bottom'>
      <Button tabIndex={0} shape='circle'>
        <BiBrush className='text-2xl' />
      </Button>
      <Dropdown.Menu
        tabIndex={0}
        className='card card-compact bg-base-100  mt-3 w-52 !p-0'
      >
        <div className='p-2'>
          {themes.map((t) => (
            <Button
              key={t}
              className='m-1'
              variant={t !== theme ? 'outline' : undefined}
              size='xs'
              onClick={() => toggleTheme(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ThemeSwitch;
