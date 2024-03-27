import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from local storage on initial render
  useEffect(() => {
    let data = localStorage.getItem('todos')
    if (data) {
      const storedTodos = JSON.parse(data);
      if (storedTodos && todos.length === 0) {
        setTodos(storedTodos);
      }
    }
  }, []);

  // Update local storage whenever todos change
  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false, createdAt: new Date() }]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = filter === 'all' ? todos :
    filter === 'done' ? todos.filter(todo => todo.completed) :
      filter === 'pending' ? todos.filter(todo => !todo.completed) :
        todos;

  console.log("filteredTodos");
  console.log(filteredTodos);
  // Sort todos by creation date in descending order
  const sortedTodos = filteredTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log("sortedTodos");
  console.log(sortedTodos);

  // Group todos by creation date
  const groupedTodos = sortedTodos.reduce((groups, todo) => {
    console.log(todo);
    const date = new Date(todo.createdAt).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {});

  console.log("groupedTodos");
  console.log(groupedTodos);

  return (
    <div className="row ">
      <div className="col-3">
      </div>
      <div className="col-5 mt-5">
        <h1 className="mb-4">Todo App</h1>
        <div className="todo-container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add a todo"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleAddTodo}>Add</button>
            </div>
          </div>
          <div className="btn-group mb-3" role="group">
            <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('all')}>All</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('done')}>Done</button>
            <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('pending')}>Pending</button>
          </div>
          {Object.entries(groupedTodos).map(([date, todos]) => (
            <div key={date}>
              <h4 className="mt-3">{date}</h4>
              <table className="table">
                <tbody>
                  {todos.map(todo => (
                    <tr key={todo.id} className={todo.completed ? 'table-success' : ''}>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id)}
                          />
                        </div>
                      </td>
                      <td>{todo.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
