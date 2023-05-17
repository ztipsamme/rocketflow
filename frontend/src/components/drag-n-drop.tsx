// import React from 'react'
// // import React, { useEffect, useState }
// //   from "react";

// import '../assets/styles/drag-n-drop.css'

// function DragNDrop() {
//     // const [task, setTask] = useState([]);

//     return (
//         <>
//             <div className="container">
//                 <div className="box">
//                     <form className="box2">
//                         <h3 className="heading">To-Do list</h3>

//                         <p className="task" draggable="true">
//                             style guide ha..
//                         </p>
//                         <p className="task" draggable="true">
//                             Choose fonts
//                         </p>
//                         <p className="task" draggable="true">
//                             Create ad
//                         </p>
//                         <p className="task" draggable="true">
//                             Write final copy
//                         </p>

//                         <button className="btn btn-primary">New Task</button>
//                     </form>

//                     {/* <input className="add2" type="button" onClick={task}>
//           Add
//         </input> */}

//                     <form className="box2">
//                         <h3 className="heading">Today</h3>

//                         <p className="task" draggable="true">
//                             Collect data
//                         </p>
//                         <p className="task" draggable="true">
//                             analyse answers
//                         </p>
//                         <p className="task" draggable="true">
//                             Check emails
//                         </p>
//                         <p className="task" draggable="true">
//                             Send wirefrane
//                         </p>
//                         <p className="task" draggable="true">
//                             Call vice pres.
//                         </p>
//                     </form>

//                     <form className="box2">
//                         <h3 className="heading">Done</h3>

//                         <p className="task" draggable="true">
//                             Send skiss
//                         </p>
//                         <p className="task" draggable="true">
//                             check emails
//                         </p>
//                         <p className="task" draggable="true">
//                             Do Style guide
//                         </p>
//                         <p className="task" draggable="true">
//                             Moodboard
//                         </p>
//                         <p className="task" draggable="true">
//                             Call President
//                         </p>
//                         <p className="task" draggable="true">
//                             Write interview
//                         </p>
//                         <p className="task" draggable="true">
//                             Write survey
//                         </p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default DragNDrop

import React from 'react'

function DragNDrop() {
    return (
        <div className="dashboard">
            <div className="cards">
                <ul className="list-group">
                    <li className="card glass border">
                        <div className="card-body">
                            <header className="d-flex justify-content-between">
                                <h4 className="card-title">Make Wireframe</h4>
                                <button className="btn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-three-dots-vertical"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    </svg>
                                </button>
                            </header>
                            <p className="card-text">
                                Use the reearch data to design a mid-fi
                                wireframe.
                            </p>
                            <div className="d-flex justify-content-between">
                                <label className="">
                                    <input type="checkbox" name="done" />
                                    In progress
                                </label>
                                <button className="btn ">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-arrow-up-right-circle"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DragNDrop
