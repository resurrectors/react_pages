import React from 'react';
import { Link } from 'react-router-dom';
import todo_image from '../images/todo.png';
import expense_image from '../images/expense.png';

function Home() {
    return (
        <div className="container mt-5">
            <div className="row">
                {/* Card 1: To-Do App */}
                <div className="col-md-6" >
                    <div className="card" style={{ width: '600px', height: '600px' }}>
                        <img src={todo_image} className="card-img-top" alt="To-Do App" />
                        <div className="card-body">
                            <h5 className="card-title">To-Do App</h5>
                            <p className="card-text">Manage your tasks effectively with our To-Do App.</p>
                            <Link to="/todo" className="btn btn-primary">Go to To-Do App</Link>
                        </div>
                    </div>
                </div>

                {/* Card 2: Expense Tracker */}
                <div className="col-md-6">
                    <div className="card" style={{ width: '600px', height: '600px' }}>
                        <img src={expense_image} className="card-img-top" alt="Expense Tracker" />
                        <div className="card-body">
                            <h5 className="card-title">Expense Tracker</h5>
                            <p className="card-text">Keep track of your expenses with our Expense Tracker.</p>
                            <Link to="/expense" className="btn btn-primary">Go to Expense Tracker</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
