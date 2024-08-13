import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import TodoTrackerHome from './MainPages/TodoTrackerHome';
import Home from './MainPages/Home';
import ExpenseHome from './MainPages/ExpenseHome';

function App() {

  return (
    <Routes>
      <Route path="/" element={< Home />} />
      <Route path="/todo" element={<TodoTrackerHome />} />
      <Route path="/expense" element={<ExpenseHome />} />
    </Routes>
  );
}

export default App;
