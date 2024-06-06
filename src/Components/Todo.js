import { useEffect, useState } from "react";
import DownloadJsonData from "../MultiPurpose/DownloadJsonData";
import CustomFileUpload from "./FileUpload";


function Todo() {
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
    }, [todos.length]);

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
            setTodos([...todos, { id: Date.now(), text: inputValue, completed: false, createdAt: new Date(), de_active: false }]);
            setInputValue('');
        }
    };

    const handleToggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDelete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, de_active: !todo.de_active } : todo
        ));
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const filteredTodos = filter === 'all' ? todos :
        filter === 'done' ? todos.filter(todo => todo.completed && !todo.de_active) :
            filter === 'pending' ? todos.filter(todo => !todo.completed && !todo.de_active) :
                filter === 'deleted' ? todos.filter(todo => todo.de_active) :
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
        <div>
            <h1 className="mb-4 text-center">Todo App</h1>
            <div className="row align-content-center justify-content-center">
                <div style={{ "width": "700px" }}>
                    <div className="input-group mb-3" style={{ "justifyContent": "center", "alignContent": "center" }}>
                        <div>
                            <input type="text" className="form-control" placeholder="Add a todo" value={inputValue} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="row text-center" style={{ "justifyContent": "center", "alignContent": "center" }}>
                        <div className="col">
                            <button className="btn btn-primary" type="button" onClick={handleAddTodo}>Add</button>
                        </div>
                        <div className="col">
                            <DownloadJsonData data={todos} />
                        </div>
                        <div className="col">
                            {/* <button className="btn btn-primary" type="button" onClick={() => { console.log("in file") }}>Upload File</button> */}
                            {/* <CustomFileUpload /> */}
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                File Upload
                            </button>

                            {/* <!-- Modal --> */}
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">File Upload</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <CustomFileUpload />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="todo-container">
                <div className="row align-content-center justify-content-center">
                    <div className="btn-group mb-3" role="group">
                        <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('all')}>All</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('done')}>Done</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('pending')}>Pending</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleFilterChange('deleted')}>Deleted</button>
                    </div>
                </div>
                <div style={{ "border": "3px solid #73AD21" }}>
                    {Object.entries(groupedTodos).map(([date, todos]) => (
                        <div key={date}>
                            <h4 className="mt-3">{date}</h4>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Status</th>
                                        <th style={{ "width": "1000px" }} scope="col">Details</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
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
                                            <td>
                                                <div>
                                                    {todo.text}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="row align-items-center justify-content-center">
                                                    <div className="col-6 align-items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg>
                                                    </div>
                                                    <div className="col-6" onClick={() => handleDelete(todo.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
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

export default Todo;