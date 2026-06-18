// cd todo-app -> npm run dev

import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList';


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Review textbooks", completed: false},
    { id: 2, text: "Complete quizes", completed: false},
  ]);
  
  const [input, setInput] = useState('');
  
  const [error, setError] = useState('');
  
  const [filter, setFilter] = useState('active');
  
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
  
  const deleteTodo = (id) => {
    /* Renew state excluding specified id. */
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  /* Return filtered tasks. */
  const getFilteredTodos = () => {
    /* Return only not-completed tasks. */
    if (filter === 'active') return todos.filter((todo) => !todo.completed);
    /* Return only completed tasks. */
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    /* If two above conditions don't apply, return all tasks.  */
    return todos;
  };
  
  /* Obtain filtered tasks. */
  const filteredTodos = getFilteredTodos();
  
  /* Obtain the number of not-completed/completed tasks. */
  /* Use .length to count because .filter makes a new array based on the condition. */
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

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
        
        <div className='filter-buttons'>
          <button
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active' : ''}
          >
            Not Complete({activeCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}
          >
            Complete({completedCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}
          >
            All({todos.length})
          </button>
        </div>
        
        <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </>
  );
}

export default App
