'use client';

import EmptyState from '@/components/EmptyState';
import TodoFilters from '@/components/TodoFilters';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';

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
    <div className="max-w-4xl mx-auto p-24">

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