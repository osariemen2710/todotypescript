// src/components/TodoDetail.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Todo } from './types/index';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

const TodoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: todo, isLoading, isError, error } = useQuery<Todo, Error>({
    queryKey: ['todo', id],
    queryFn: async () => {
      const { data } = await axios.get<Todo>(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id, // Only run query if id is available
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message={error?.message || 'Failed to fetch todo details.'} />;
  if (!todo) return <ErrorMessage message="Todo not found." />;

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto my-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{todo.title}</h1>
      <div className="mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          todo.completed
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          Status: {todo.completed ? 'Completed' : 'Active'}
        </span>
      </div>
      <p className="text-gray-700 text-lg mb-6">
        This is a detailed view for the todo item. You can expand on this to add descriptions, due dates, etc.,
        if your API supported it. For now, it shows the core details.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to List
      </button>
    </div>
  );
};

export default TodoDetail;