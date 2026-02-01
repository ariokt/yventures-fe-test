'use client';

import { usePathname } from 'next/navigation';
import SidebarItem from './SidebarItem';

type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Todos', href: '/todos' },
  { label: 'Posts', href: '/posts' },
];

interface SidebarProps {
  isOpen: boolean,
  onClose: () => void,
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`z-20 fixed h-screen w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-14 flex items-center justify-between px-4 border-b border-gray-800">
        <span className="font-bold">MyApp</span>
        <button
          onClick={onClose}
          className="text-xl"
        >
          ✕
        </button>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <SidebarItem key={item.label} label={item.label} href={item.href} active={isActive} />
          );
        })}
      </nav>
    </aside>
  );
}