import Todo from '../Components/Todo';
import Navbar from '../Components/Navbar';
function TodoTrackerHome() {

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
