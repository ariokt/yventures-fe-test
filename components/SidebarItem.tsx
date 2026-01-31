import Link from 'next/link';

type Props = {
  label: string;
  href: string;
  active?: boolean;
};

export default function SidebarItem({
  label,
  href,
  active = false,
}: Props) {
  return (
    <Link
      href={href}
      className={`block rounded-md px-4 py-2 text-sm font-medium transition
        ${active
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
      `}
    >
      {label}
    </Link>
  );
}
