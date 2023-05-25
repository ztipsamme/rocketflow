import React, { useState, MouseEvent, useEffect } from 'react'
import axios from 'axios'

interface tasksInterface {
    id: string
    title: string
    description: string
    status: number
}

const TaskCard = (props: tasksInterface) => {
    const [cardOpen, setCardOpen] = useState(false)
    const [sendToMenuOpen, setSendToMenuOpen] = useState(false)
    const [taskStatus, setTaskStatus] = useState(props.status)

    const chevron = (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.61429 0.452128L7.49235 5.32178L12.3689 0.452128C12.5173 0.301935 12.6872 0.188901 12.8786 0.113031C13.0699 0.0371602 13.2643 3.73874e-07 13.4602 3.6531e-07C13.6561 3.56746e-07 13.8474 0.0371601 14.0342 0.113031C14.2209 0.188901 14.3878 0.301935 14.5362 0.452128C14.8454 0.754062 15 1.11329 15 1.5329C15 1.95251 14.8454 2.31173 14.5378 2.61367L8.67092 8.49751C8.52245 8.6477 8.34337 8.76538 8.13673 8.85209C7.92857 8.9388 7.71888 8.9868 7.50612 8.99764C7.29337 9.00848 7.0898 8.98215 6.89235 8.91557C6.69643 8.85054 6.53265 8.7437 6.40561 8.59351L0.445408 2.61212C0.148469 2.31173 -3.08123e-07 1.95096 -3.26397e-07 1.5329C-3.44739e-07 1.11329 0.148469 0.754061 0.445408 0.453675C0.593877 0.303482 0.763775 0.190452 0.955102 0.114581C1.14643 0.0387104 1.34082 0.00154966 1.53673 0.00154965C1.73265 0.00154965 1.92398 0.0387104 2.11071 0.114581C2.29745 0.188903 2.46582 0.301935 2.61429 0.452128Z"
                fill="white"
            />
        </svg>
    )
    const trashCanIcon = (
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
    )
    const migrationIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-folder-symlink-fill"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
            />
        </svg>
    )



    const checkboxIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-check-circle-fill"
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
        </svg>
    )




    const toggleCard = (e: MouseEvent<HTMLButtonElement>) => {
        if (cardOpen) {
            setCardOpen(false)
        } else {
            setCardOpen(true)
        }
        console.log(e.currentTarget.getAttribute('data-value'))
    }

    const handleActive = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-value')
        const status = Number(e.currentTarget.value)

        if (status !== 2) {
            updateState(id, 2)
        } else {
            updateState(id, 0)
        }
        document.location.reload()
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios({
            method: 'delete',
            url: 'http://localhost:8080/api/delete-task',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { id: e.currentTarget.getAttribute('data-value') },
        })
        document.location.reload()
    }

    const handleMigrate = async (e: MouseEvent<HTMLButtonElement>) => {
        setSendToMenuOpen(true)
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-value')
        const status = Number(e.currentTarget.value)

        // if (status === 0) {
        //     updateState(id, 2)
        // } else {
        //     updateState(id, 0)
        // }

        if (sendToMenuOpen) {
            setSendToMenuOpen(false)
        } else {
            setSendToMenuOpen(true)
        }
        console.log(e.currentTarget.getAttribute('data-value'))

        //document.location.reload()
    }

    const handleDone = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute('data-value')
        const status = Number(e.currentTarget.value)

        if (status !== 3) {
            updateState(id, 3)
        } else {
            updateState(id, 0)
        }
        document.location.reload()
    }

    function updateState(id: string | null, state: number) {
        axios({
            method: 'put',
            url: 'http://localhost:8080/api/update-task-status',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { id: id, status: state },
        })
    }

  function updateTask(e: MouseEvent<HTMLLIElement>) {

    const status = Number(e.currentTarget.id)

        console.log(e.currentTarget.id)
        console.log(props.id)
        console.log(status)

    axios({
      method: "put",
      url: 'http://localhost:8080/api/update-task-status',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id: props.id, status: status },
    })

        //fundera på om ni ska ladda in senaste statusen från backend
        setTaskStatus(status)
        // console.log(taskStatus);
    }

  function saveNewTask(e: MouseEvent<SVGSVGElement>) {
    // const id = e.currentTarget.getAttribute('data-value')

    axios({
      method: "post",
      url: 'http://localhost:8080/api/add-task',
      headers: {
        'Content-Type': 'application/json',

      },
      data: { title: props.title, description: props.description, id: props.id, status: props.status},
    })

  }




    return (
        <div
            id="Card"
            className="card"
            style={{ borderRadius: cardOpen ? '10px' : '8px' }}
        >
            <div className="header">
                <h3 className="card-title">{props.title}</h3>
                <button
                    className="icon"
                    onClick={toggleCard}
                    data-value="false"
                    style={{ transform: cardOpen ? 'scaleY(-1)' : 'none' }}
                >
                    {chevron}
                </button>
            </div>
            <div
                style={{
                    display: cardOpen ? 'block' : 'none',
                }}
            >
                <p className="card-text">{props.description}</p>
                <div className="controls">
                    <button
                        onClick={handleDelete}
                        data-value={props.id}
                        className="icon"
                    >
                        {trashCanIcon}
                    </button>

                        <button
                            onClick={handleMigrate}
                            data-value={props.id}
                            value={props.status}
                            className="btn btn-secondary btn-icon"
                        >
                {migrationIcon ? arrowDownIcon : arrowUpIcon}

                {sendToMenuOpen && <ul className="list-group">

                <li id="1" onClick={updateTask} className="list-group-item">Send to To-do</li>
                <li id="2" onClick={updateTask} className="list-group-item">Send to Today</li>
                <li id="3" onClick={updateTask} className="list-group-item">Send to Active</li>

              </ul>}
                        </button>
                        <button
                            onClick={handleDone}
                            data-value={props.id}
                            value={props.status}
                            className="btn btn-secondary btn-icon"
                        >
                            {checkboxIcon}
              </button>
              {/* <ul className="list-group">
                <li className="list-group-item">Send to &rdqou;To-do&rdqou;</li>
                <li className="list-group-item">Send to &rdqou;Today&rdqou;</li>
                <li className="list-group-item">Send to &rdqou;Active&rdqou;</li>
              </ul> */}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
