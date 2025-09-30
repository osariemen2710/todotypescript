// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [theme,] = useState<'light' | 'dark'>('light'); // You can implement theme switching

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/todo/:id" element={<TodoDetail />} />
            </Routes>
          </main>
          <Footer />
          <Toaster richColors />
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;