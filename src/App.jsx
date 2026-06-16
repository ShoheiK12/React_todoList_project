// cd todo-app -> npm run dev

import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Review textbooks", completed: false},
    { id: 2, text: "Complete quizes", completed: false},
  ]);
  
  const [input, setInput] = useState('');
  
  const [error, setError] = useState('');
  
  const addTodo = () => {
    /* Trim blank in input. -> If users input ''(space), it wouldn't be regarded as empty. trim() prevents this case. */
    const text = input.trim();
    /* If input is empty, display an error message and finish processing. -> Once 'return' is implemented, the process of this function will be terminated, which means the codes after this 'return' (setTodos()) will not be implemented. */
    if (!text) {
      setError('Enter your task.');
      return;
    }
    setTodos([
      ...todos,
      {
        id: Date.now(),
        /* Use trimmed text. */
        text,
        completed: false,
      },
    ]);
    /* Reset input state for next tasks after adding tasks. */
    setInput('');
    /* Reset an error message once tasks are made. */
    setError('');
  }
  
  /* Switch completed. */
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
      /* If todo.id === id, switch 'completed'. Otherwise, return todo without switching. */
      todo.id === id
        /* Overwrite only 'completed'. !todo -> Switch false(true) to true(false). */
        ? { ...todo, completed: !todo.completed }
        : todo
      )
    );
  };

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
          <button type="submit" className='add-button' onClick={addTodo}>
            Add
          </button>
          {error && <p className='error-message'>{error}</p>}
        </div>
        
        <ul className="todo-list">
          {todos.map((todo) => (
            /* if todo.completed is true, set className="completed" (which cross out tasks). */
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input 
                type="checkbox"
                /* if todo.completed is true, tick in the checkbox. */
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App
