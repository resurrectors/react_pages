import Todo from '../Components/Todo';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';

function TodoTrackerHome() {
    const location = useLocation();
    console.log(location);
    return (
        <div>
            <Navbar />
            <Todo />
            <hr />
            {/* <CustomFileUpload /> */}
        </div>
    );
}

export default TodoTrackerHome;
