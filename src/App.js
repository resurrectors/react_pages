import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './Components/Todo';
import CustomFileUpload from './Components/FileUpload';
import Navbar from './Components/Navbar';
function App() {

  return (
    <div>
      <Navbar />
      <Todo />
      <hr />
      {/* <CustomFileUpload /> */}
    </div>
  );
}

export default App;
