import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import TodoTrackerHome from './MainPages/TodoTrackerHome';
import Home from './MainPages/Home';
import ExpenseHome from './MainPages/ExpenseHome';
import DailyTrackerHome from './Components/Daily-Tracker/DailyTrackerHome';
import HomeLoanTracker from './Components/EMI/HomeLoan';
import StopWatch from './MainPages/StopWatch';

function App() {

  return (
    <Routes>
      <Route path="/react_pages" element={< Home />} />
      <Route path="/react_pages/todo" element={<TodoTrackerHome />} />
      <Route path="/react_pages/expense" element={<ExpenseHome />} />
      <Route path="/react_pages/daily-tracker" element={<DailyTrackerHome />} />
      <Route path="/react_pages/loan" element={<HomeLoanTracker />} />
      <Route path="/react_pages/stopwatch" element={<StopWatch />} />
    </Routes>
  );
}

export default App;
