import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [discription, setDiscription] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    setIsInputEmpty(text.trim() === '');
  }, [text]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!isInputEmpty) {
      const sanitizedText = DOMPurify.sanitize(text);
      const sanitizedDiscription = DOMPurify.sanitize(discription);
      onAddTodo({
        text: sanitizedText,
        date: date,
        discription: sanitizedDiscription
      });
      setText('');
      setDate('');
      setDiscription('');
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    switch (e.target.name) {
      case 'date':
        setDate(inputValue);
        break;
      case 'discription':
        setDiscription(capitalizedValue);
        break;
      default:
        setText(capitalizedValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
      <input
        type="text"
        name="text"
        id="add-todo"
        className="appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700"
        placeholder="Add new title..."
        maxLength={29}
        value={text}
        onChange={handleInputChange}
        required
      />
      <input
        type="date" // Changed to date input
        name="date"
        id="add-date"
        className="appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700"
        placeholder="Add date..."
        value={date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="discription"
        id="add-todo"
        className="appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700"
        placeholder="Add new description..."
        value={discription}
        onChange={handleInputChange}
        required
      />
      <button
        type="submit"
        className="shrink p-2 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded focus:outline-none disabled:opacity-25 disabled:pointer-events-none"
        disabled={isInputEmpty}
      >
        Create
      </button>
    </form>
  );
};

export default TodoForm;
