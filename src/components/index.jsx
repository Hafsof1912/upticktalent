import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api';

export default function TodoPage() {
  const { data, mutate } = useSWR('/api/todos', getTodos);

  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    const storedCompletedTodos = localStorage.getItem('completedTodos');
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

  const handleAddTodo = async ({ text, date, discription }) => {
    const newTodo = {
      id: Date.now(),
      text,
      date,
      discription
    };

    try {
      await mutate(addTodo(newTodo), {
        optimisticData: data ? [...data, newTodo] : [newTodo],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      });
      toast.success('Successfully added the new item.');
    } catch (e) {
      toast.error('Failed to add the new item.');
    }
  };

  const handleToggleCompletion = (todoId) => {
    const updatedCompletedTodos = completedTodos.includes(todoId)
      ? completedTodos.filter((id) => id !== todoId)
      : [...completedTodos, todoId];
    setCompletedTodos(updatedCompletedTodos);

    const todo = data.find((item) => item.id === todoId);
    if (todo) {
      const message = completedTodos.includes(todoId)
        ? 'Todo marked as incomplete!'
        : 'Todo marked as completed!';
      toast.success(message, {
        icon: '🎉'
      });
    }
  };

  const handleUpdateTodo = async (todoId, newText) => {
    try {
      const updatedTodo = { ...data.find((item) => item.id === todoId), text: newText };
      await mutate(updateTodo(updatedTodo), {
        optimisticData: data.map((item) => (item.id === todoId ? updatedTodo : item)),
        rollbackOnError: true,
        revalidate: false
      });
      toast.success('Successfully updated the item.');
    } catch (e) {
      toast.error('Failed to update the item.');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await mutate(deleteTodo(todoId), {
        optimisticData: data.filter((item) => item.id !== todoId),
        rollbackOnError: true,
        revalidate: false
      });
      toast.success('Successfully deleted the item.');
    } catch (e) {
      toast.error('Failed to delete the item.');
    }
  };

  const isTodoCompleted = (id) => completedTodos.includes(id)

  return (
    <div className="h-full lg:w-3/4 lg:max-w-lg w-full flex items-center justify-center font-sans">
      <div className="w-full">
        <div className="p-6 m-4 bg-white rounded">
          <h1 className="text-gray-700">Create List</h1>
          <TodoForm onAddTodo={handleAddTodo} />
        </div>

        <div className='p-6 m-4 bg-white rounded'>
          <h1 className="text-gray-700 mb-3 pb-1.5 border-b">Task Todo</h1>
          { data?.filter( item => !isTodoCompleted(item.id)).map((todo) => (
            <TodoList
              key={todo.id}
              todo={todo}
              handleToggleCompletion={handleToggleCompletion}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            /> )
          ) }
        </div>

        <div className='p-6 m-4 bg-white rounded'>
          <h1 className="text-gray-700 mb-3 pb-1.5 border-b">Completed Task</h1>
          { data?.filter( item => isTodoCompleted(item.id)).map((todo) => (
            <TodoList
              key={todo.id}
              todo={todo}
              isTodoCompleted={true}
              handleToggleCompletion={handleToggleCompletion}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            /> )
          ) }
        </div>
      </div>
    </div>
  );
}
