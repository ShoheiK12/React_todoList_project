function TodoList({ todos, onToggle, onDelete }) {
  /* If no tasks, display no tasks. Once this return is implemented, ul tags will not be executed. */
  if (todos.length === 0) {
    return <p className="empty-state">No Tasks</p>;
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
      /* if todo.completed is true, set className="completed" (which cross out tasks). */
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <input 
            type="checkbox"
            /* if todo.completed is true, tick in the checkbox. */
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span>{todo.text}</span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;