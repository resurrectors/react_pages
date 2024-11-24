import { useEffect, useState, useRef } from "react";
import { getLocalStorage, updateLocalStorage } from "../utils/localStorageHelper";
import { Link, useLocation } from "react-router-dom";

function ExpenseHome() {

    const [expenseData, setExpenseData] = useState({
        "Budget": 0,
        "Spent": 0,
        "Balance": 0,
        "BudgetHistory": [],
        "SpentHistory": [],
        "BalanceHistory": [],
    });
    const [inputValue, setInputValue] = useState('');
    const [inputText, setInputText] = useState('');
    var flag = useRef(true);
    const [addState, setAddState] = useState("Budget");
    const location = useLocation();
    console.log(location);

    // Load todos from local storage on initial render
    useEffect(() => {
        // let data = localStorage.getItem('myExpenseData')
        if (flag.current) {
            let data = getLocalStorage("myExpenseData");
            setExpenseData(data);
            flag.current = false
            console.log("in flag");
        }
    }, [expenseData, flag]);

    // Update local storage whenever todos change
    useEffect(() => {
        if (Object.keys(expenseData).length !== 0) {
            // localStorage.setItem('myExpenseData', JSON.stringify(expenseData));
            updateLocalStorage("myExpenseData", expenseData)
        }
    }, [expenseData]);


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleBudgetAddClick = () => {
        let initialBudgetValue = expenseData.Budget + parseInt(inputValue)
        let initialBudgetHistory = [...expenseData.BudgetHistory, { "text": inputText, "value": inputValue, "date": new Date(Date.now()).toLocaleString() }]

        let balance = initialBudgetValue - expenseData.Spent

        setExpenseData({ ...expenseData, ...{ "Budget": initialBudgetValue, "BudgetHistory": initialBudgetHistory, "Balance": balance } })

        setInputValue('');
        setInputText('');
    };

    const handleTextChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSpentAddClick = () => {
        let initialSpentValue = expenseData.Spent + parseInt(inputValue)
        let initialSpentHistory = [...expenseData.SpentHistory, { "text": inputText, "value": inputValue, "date": new Date(Date.now()).toLocaleString() }]

        let balance = expenseData.Budget - initialSpentValue
        setExpenseData({ ...expenseData, ...{ "Spent": initialSpentValue, "SpentHistory": initialSpentHistory, "Balance": balance } })

        setInputValue('');
        setInputText('');
    };

    const addButtonClick = (name) => {
        console.log(name);
        setAddState(name)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/react_pages/expense">Expense Tracker</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item m-2">
                                <Link to="/react_pages" className="btn btn-primary">Home</Link>
                                {/* <a className="nav-link active" aria-current="page" href="/react_pages">Home</a> */}
                            </li>
                            <li className="nav-item m-2">
                                <Link to="/react_pages/todo" className="btn btn-primary">To-Do App</Link>
                                {/* <a className="nav-link active" aria-current="page" href="/react_pages/todo">Todo Tracker</a> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <br></br>
            <br></br>
            <div className="container-fluid" width="100vw">
                <div className="row d-flex justify-content-evenly">
                    <div className="card col-4" style={{ "width": "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{expenseData?.Budget}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Budget</h6>
                            <button className="btn btn-primary" onClick={() => addButtonClick("Budget")} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="card col-4" style={{ "width": "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{expenseData?.Spent}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Spent</h6>
                            <button className="btn btn-primary" onClick={() => addButtonClick("Spent")} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add
                            </button>
                        </div>
                    </div>

                    <div className="card col-4" style={{ "width": "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">{expenseData?.Balance}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Balance</h6>
                        </div>
                    </div>

                    {/* <!-- Modal --> */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Enter Details {addState}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Enter amount"
                                    />
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        value={inputText}
                                        onChange={handleTextChange}
                                        placeholder="Enter text"
                                    />
                                </div>
                                <div class="modal-footer">
                                    {
                                        addState === "Budget" ?
                                            <button type="button" class="btn btn-secondary" onClick={handleBudgetAddClick} data-bs-dismiss="modal">Add Budget</button>
                                            :
                                            <button type="button" class="btn btn-secondary" onClick={handleSpentAddClick} data-bs-dismiss="modal">Add Spent</button>
                                    }
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <br></br>
            <br></br>
            <div className="container">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" style={{ "width": "50%" }}>Text</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date and Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseData.SpentHistory.map((item) => (
                            <tr>
                                <td>{item.text}</td>
                                <td>{item.value}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ExpenseHome;