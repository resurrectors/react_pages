import React from 'react';
import { Link } from 'react-router-dom';
import todo_image from '../images/todo.png';
import expense_image from '../images/expense.png';

function Home() {
    return (
        <div className="container mt-5">
            <div className="d-flex flex-wrap justify-content-center gap-3">

                <div className="card" style={{ width: "300px" }}>
                    <img src={todo_image} className="card-img-top" alt="To-Do App" style={{ minHeight: '300px', maxHeight: '300px' }} />
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title">To-Do App</h5>
                        <p className="card-text">Manage your tasks effectively with our To-Do App.</p>
                        <Link to="/react_pages/todo" className="btn btn-secondary">Go to To-Do App</Link>
                    </div>
                </div>

                <div className="card" style={{ width: "300px" }}>
                    <img src={expense_image} className="card-img-top" alt="Expense Tracker" style={{ minHeight: '300px', maxHeight: '300px' }} />
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title">Expense Tracker</h5>
                        <p className="card-text">Keep track of your expenses with our Expense Tracker.</p>
                        <Link to="/react_pages/expense" className="btn btn-secondary">Go to Expense Tracker</Link>
                    </div>
                </div>

                <div className="card" style={{ width: "300px" }}>
                    <img src={expense_image} className="card-img-top" alt="Daily Tracker" style={{ minHeight: '300px', maxHeight: '300px' }} />
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title">Daily Tracker</h5>
                        <p className="card-text">Keep track of your day to day activities.</p>
                        <Link to="/react_pages/daily-tracker" className="btn btn-secondary">Go to Daily Tracker</Link>
                    </div>
                </div>

                <div className="card" style={{ width: "300px" }}>
                    <img src={expense_image} className="card-img-top" alt="Stop Watch" style={{ minHeight: '300px', maxHeight: '300px' }} />
                    <hr />
                    <div className="card-body">
                        <h5 className="card-title">Stop Watch</h5>
                        <p className="card-text">Keep track of your time.</p>
                        <Link to="/react_pages/stopwatch" className="btn btn-secondary">StopWatch</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
