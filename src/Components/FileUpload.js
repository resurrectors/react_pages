// import { useState } from "react";

function CustomFileUpload(props) {



    const handleSubmit = e => {
        e.preventDefault();
        // console.log(props.todos);
        // console.log(e);
        const fileReader = new FileReader();
        fileReader.readAsText(e.target[0].files[0], "UTF-8");

        const fileData = () => (
            fileReader.onload = e => {
                let fileData = JSON.parse(e.target.result)
                // console.log(fileData);
                props.setTodos([...props.todos, ...fileData])
            }
        )
        fileData()

        // console.log("done");
    }

    return (
        <div>
            <div>
                <p style={{ "alignContent": "center", "textAlign": "center" }}>FileUploadComponent</p>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3 align-items-center align-content-center">
                        <div className="col-auto">
                            <input className="form-control" type="file" id="formFile" accept="application/json" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" value="Submit" className="btn btn-primary">Load JSON</button>
                        </div>
                    </div>
                </form>
            </div>
            {/* <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">CompletedAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(
                                (item, index) =>
                                    <tr key={item.id}>
                                        <th scope="row">{item.text}</th>
                                        <td>{item.completed ? "Completed" : "Incomplete"}</td>
                                         <td>{new Date(item.createdAt).getDate()}</td>
                                        <td>{item.createdAt}</td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div> */}
            {/* <DownloadJsonData data={data} filename="latestTodo.json" /> */}
        </div>
    );
}

export default CustomFileUpload;