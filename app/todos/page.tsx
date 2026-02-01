'use client';

import EmptyState from '@/components/EmptyState';
import TodoFilters from '@/components/TodoFilters';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';
import Link from 'next/link';

export default function TodosPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    stats,
  } = useTodos();

  const showEmptyState = todos.length === 0;

  return (
    <div className="max-w-4xl mx-auto py-24 md:p-24">
      <div className="flex items-center justify-between mb-4">
        <Link href={'/'} className="cursor-pointer">
          &#10216; Prev
        </Link>
        <Link href={'/posts'} className="cursor-pointer">
          Next &#10217;
        </Link>
      </div>
      <TodoForm onAddTodo={addTodo} />

      <TodoFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        stats={stats}
      />

      {showEmptyState ? (
        <EmptyState />
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    </div>
  );
}