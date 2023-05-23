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

import React, { useEffect, useState, MouseEvent } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import axios from 'axios'

interface tasksInterface {
    id: string
    title: string
    description: string
    status: number
    created: string
}

const DragNDrop: React.FC = () => {
    const [tasks, setTasks] = useState<tasksInterface[]>([])
    const [cardOpen, setCardOpen] = useState(false)

    const toggleCard = (e: MouseEvent<HTMLButtonElement>) => {
        if (cardOpen) {
            setCardOpen(false)
        } else {
            setCardOpen(true)
        }
        console.log(e.currentTarget.getAttribute('data-value'))
        // e.currentTarget.classList.add('active')
        // e.classList.remove('active')
    }

    const getTasks = async () => {
        await axios
            .get('http://localhost:8080/api')
            .then((response) => {
                setTasks(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios({
            method: 'delete',
            url: 'http://localhost:8080/api/',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { id: e.currentTarget.getAttribute('data-value') },
        })
        document.location.reload()
    }

    const handleMigrate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-value')
        const btn = e.currentTarget.id
        const status = Number(e.currentTarget.value)
        let state = 0

        if (
            (btn === 'done' && status === 0) ||
            (btn === 'done' && status === 1)
        ) {
            state = 2
        } else if (
            (btn === 'migrate' && status === 0) ||
            (btn === 'migrate' && status === 2)
        ) {
            state = 1
        } else {
            state = 0
        }

        axios({
            method: 'put',
            url: 'http://localhost:8080/api/update-status',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { id: id, status: state },
        })

        document.location.reload()
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <>
            <ListGroup>
                {tasks.map((value) => (
                    <li
                        key={value.id}
                        style={{ listStyle: 'none' }}
                        className="mb-2"
                    >
                        <Card className="glass border p-2 pb-1">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>{value.title}</Card.Title>
                                    <button
                                        onClick={toggleCard}
                                        className="btn"
                                        data-value="false"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-chevron-down"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    style={{
                                        display: cardOpen ? 'block' : 'none',
                                    }}
                                >
                                    <Card.Text>{value.description}</Card.Text>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            onClick={handleDelete}
                                            data-value={value.id}
                                            className="btn btn-secondary btn-icon"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash3-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                            </svg>
                                        </button>
                                        <button
                                            id="migrate"
                                            onClick={handleMigrate}
                                            data-value={value.id}
                                            value={value.status}
                                            className="btn btn-secondary btn-icon"
                                        >
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
                                        <button
                                            id="done"
                                            onClick={handleMigrate}
                                            data-value={value.id}
                                            value={value.status}
                                            className="btn btn-secondary btn-icon"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-square"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </li>
                ))}
            </ListGroup>
        </>
    )
}

export default DragNDrop
