import React, { useCallback } from 'react';
import cn from 'clsx';

const TodoList = ({
  todo,
  isTodoCompleted,
  handleToggleCompletion,
  handleUpdateTodo,
  handleDeleteTodo
}) => {
  const handleEditClick = useCallback((todoId) => {
    const newText = prompt('Enter the new text:');
    if (newText !== null) {
      handleUpdateTodo(todoId, newText);
    }
  }, [handleUpdateTodo]);

  const handleDeleteClick = useCallback((todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      handleDeleteTodo(todoId);
    }
  }, [handleDeleteTodo]);

  return (
    <div className=" mb-4 last:mb-0 bg-gray-100 p-3 rounded-md">
      <div className='flex justify-between'>
        <div className="flex flex-col">
          <p key={todo.id} className={cn('mr-auto truncate line-clamp-2 font-semibold text-lg', {
            "text-green-600": isTodoCompleted,
            "text-sky-600": !isTodoCompleted
          })}>
            {todo.text}
          </p>
          <p key={todo.id} className={cn('mr-auto whitespace-nowrap line-clamp-2 my-1', {
            "bg-slate-50 px-2 py-1 border-2 rounded": todo.date
          })}>
            {todo.date}
          </p>
        </div>
        <div className="flex h-10">
          {!isTodoCompleted && (
            <>
              <button
                type="button"
                className="shrink p-2 ml-4 border-2 rounded hover:text-white text-sky-500 border-sky-500 hover:bg-sky-500"
                onClick={() => handleToggleCompletion(todo.id)}
              >
                Done
              </button>
              <button
                type="button"
                className="shrink p-2 ml-4 border-2 rounded hover:text-white text-teal-500 border-teal-500 hover:bg-teal-500"
                onClick={() => handleEditClick(todo.id)}
              >
                Edit
              </button>
            </>
          )}
          <button
            type="button"
            className="shrink p-2 ml-4 border-2 rounded hover:text-white text-red-500 border-red-500 hover:bg-red-500"
            onClick={() => handleDeleteClick(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <p key={todo.id} className='mr-auto'>
        {todo.discription}
      </p>
    </div>
  );
};

export default TodoList;