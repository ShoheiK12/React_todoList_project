// cd todo-app -> npm run dev

import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Review textbooks", completed: false},
    { id: 2, text: "Complete quizes", completed: false},
  ]);
  
  const [input, setInput] = useState('');

  return (
    <>
      <div className="app">
        <h1>ToDo app</h1>
        
        <div className='todo-form'>
          <label htmlFor="todo-input" className='form-label'>
            New Task
          </label>
          <input 
            id='todo-input' 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Input new task'
            className='todo-input' 
          />
          <button type="submit" className='add-button'>
            Add
          </button>
        </div>
        
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App
