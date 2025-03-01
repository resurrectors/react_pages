import React, { useState } from "react";
import { Line } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeLoanTracker = () => {
    const [loanDetails, setLoanDetails] = useState({
        amount: "",
        rate: "",
        tenure: "",
        prepayment: "",
        increasedEMI: "",
        newRate: ""
    });

    const [chartData, setChartData] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoanDetails((prev) => ({ ...prev, [name]: value }));
    };

    const calculateLoanDetails = () => {
        let principal = parseFloat(loanDetails.amount);
        let rate = parseFloat(loanDetails.rate) / 1200; // Monthly interest rate
        let tenure = parseFloat(loanDetails.tenure) * 12; // Convert years to months
        let emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1);

        let data = [];
        for (let i = 0; i < tenure; i++) {
            let interest = principal * rate;
            let principalPayment = emi - interest;
            principal -= principalPayment;
            data.push({ month: i + 1, balance: principal, interestPaid: interest, principalPaid: principalPayment });
        }

        setChartData(data);
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Home Loan Tracker</h2>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="amount" placeholder="Loan Amount" onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="rate" placeholder="Interest Rate (%)" onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="tenure" placeholder="Tenure (years)" onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="prepayment" placeholder="Prepayment Amount" onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="increasedEMI" placeholder="Increase in EMI" onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="newRate" placeholder="Updated Interest Rate (%)" onChange={handleInputChange} />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={calculateLoanDetails}>Calculate</button>
                    <div className="mt-4">
                        <Line data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeLoanTracker;
