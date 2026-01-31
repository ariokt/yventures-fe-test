'use client';

import { FormEvent, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: (e: FormEvent) => void;
  disabled: boolean;
}

export default function PrimaryButton({ children, onClick, disabled }: ButtonProps) {

  return (
    <button
    disabled={disabled}
    type="submit"
    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
    onClick={onClick}
  >
    { children }
  </button>
  );
}