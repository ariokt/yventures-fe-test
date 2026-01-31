'use client';

import { useState, useEffect } from "react";

export type TodoStatus = 'all' | 'completed' | 'pending';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoStatus>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadTodos = () => {
      try {
        setIsLoading(true);
        const stored = localStorage.getItem('todos');
        if (stored) {
          const parsed = JSON.parse(stored);
          setTodos(parsed);
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos:', error);
      }
    }
  }, [todos, isLoading]);

  const addTodo = (title: string) => {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  return {
    todos: filteredTodos,
    stats,
    allTodos: todos,
    filter,
    toggleTodo,
    isLoading,
    setFilter,
    addTodo,
    deleteTodo,
  };
}