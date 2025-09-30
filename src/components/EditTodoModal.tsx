// src/components/EditTodoModal.tsx
import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import Modal from './Modal';
import type { Todo } from './types';
import LoadingSpinner from './LoadingSpinner';

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo;
  onSave: (id: number, title: string, completed: boolean) => void;
  isPending: boolean;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({ isOpen, onClose, todo, onSave, isPending }) => {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(todo.id, title, completed);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Todo">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="editTodoTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Todo Title
          </label>
          <input
            type="text"
            id="editTodoTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
            placeholder="e.g., Buy groceries"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="editTodoCompleted"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-2 cursor-pointer"
            disabled={isPending}
          />
          <label htmlFor="editTodoCompleted" className="text-sm font-medium text-gray-700">
            Completed
          </label>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center"
            disabled={isPending}
          >
            {isPending ? <LoadingSpinner size="sm" /> : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;