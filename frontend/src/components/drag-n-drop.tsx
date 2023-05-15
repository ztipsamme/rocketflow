import React from 'react'
// import React, { useEffect, useState }
//   from "react";

  import "./drag-n-drog.css";


function DragNDrop() {

  // const [task, setTask] = useState([]);

  return <>
    <div className='container'>
    <div className="box">
      <form className="box2">
        <h3 className="heading">To-Do list</h3>

        <p className="task" draggable="true">style guide ha..</p>
        <p className="task" draggable="true">Choose fonts</p>
        <p className="task" draggable="true">Create ad</p>
        <p className="task" draggable="true">Write final copy</p>

        <button className="btn btn-primary">New Task</button>
      </form>

      {/* <input className="add2" type="button" onClick={task}>
          Add
        </input> */}




      <form className="box2">
        <h3 className="heading">Today</h3>

        <p className="task" draggable="true">Collect data</p>
        <p className="task" draggable="true">analyse answers</p>
        <p className="task" draggable="true">Check emails</p>
        <p className="task" draggable="true">Send wirefrane</p>
        <p className="task" draggable="true">Call vice pres.</p>
      </form>



      <form className="box2">
        <h3 className="heading">Done</h3>

        <p className="task" draggable="true">Send skiss</p>
        <p className="task" draggable="true">check emails</p>
        <p className="task" draggable="true">Do Style guide</p>
        <p className="task" draggable="true">Moodboard</p>
        <p className="task" draggable="true">Call President</p>
        <p className="task" draggable="true">Write interview</p>
        <p className="task" draggable="true">Write survey</p>
      </form>

      </div>
      </div>

  </>
}

export default DragNDrop
