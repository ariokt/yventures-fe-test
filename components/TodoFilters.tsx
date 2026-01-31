'use client';

import { TodoStatus } from '../hooks/useTodos';

interface TodoFiltersProps {
  currentFilter: TodoStatus;
  onFilterChange: (filter: TodoStatus) => void;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export default function TodoFilters({
  currentFilter,
  onFilterChange,
  stats,
}: TodoFiltersProps) {
  const filters: { value: TodoStatus; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'pending', label: 'Pending', count: stats.pending },
    { value: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="mb-6 flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.value;
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`
              flex-1 px-4 py-2 rounded-md font-medium text-sm transition-all
              ${
                isActive
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            {filter.label}
            <span
              className={`
                ml-2 px-2 py-0.5 rounded-full text-xs
                ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }
              `}
            >
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}