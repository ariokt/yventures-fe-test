'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (id: number) => Promise<void>;
  onClear: () => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onSearch,
  onClear,
}: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const postId = parseInt(localQuery);
    
    if (localQuery.trim() && !isNaN(postId) && postId > 0) {
      onSearchChange(localQuery);
      await onSearch(postId);
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    onClear();
  };

  const handleInputChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setLocalQuery(numericValue);
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={localQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search by Post ID (e.g., 1, 2, 3...)"
            className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <button
          type="submit"
          disabled={!localQuery.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Search
        </button>

        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Clear
          </button>
        )}
      </form>

      <p className="mt-2 text-sm text-gray-500">
        Hint: Enter a post ID (1-100) to view the post and its comments
      </p>
    </div>
  );
}