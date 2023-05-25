import React, { useState, MouseEvent, useEffect } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
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


    const arrowDownIcon = (
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
    )
    const arrowUpIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-up"
            viewBox="0 0 16 16"
        >
            <path
                fillRule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
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
            className="bi bi-arrow-up-right-circle"
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
            className="bi bi-square"
            viewBox="0 0 16 16"
        >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
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

    const id = Number(e.currentTarget.id)
    const status = e.currentTarget.value

    console.log(e.currentTarget.id)
    console.log(props.id)
    console.log(status)

    axios({
      method: "put",
      url: 'http://localhost:8080/api/update-task-status',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id: id, status: status },
    })

    //fundera på om ni ska ladda in senaste statusen från backend
    setTaskStatus(status);
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
        <Card className="glass border p-2 pb-1">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{props.title}</Card.Title>
                    <button
                        onClick={toggleCard}
                        className="btn"
                        data-value="false"
                    >
                        {cardOpen ? arrowUpIcon : arrowDownIcon}
                    </button>
                </div>
                <div
                    style={{
                        display: cardOpen ? 'block' : 'none',
                    }}
                >
                    <Card.Text>{props.description}</Card.Text>
                    <div className="d-flex justify-content-between">
                        <button
                            onClick={handleDelete}
                            data-value={props.id}
                            className="btn btn-secondary btn-icon"
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

                <li id={props.id} value='1'onClick={updateTask} className="list-group-item">Send to To-do</li>
                <li id={props.id} value='2'onClick={updateTask} className="list-group-item">Send to Today</li>
                <li id={props.id} value='3' onClick={updateTask} className="list-group-item">Send to Active</li>

              </ul>}
              </button>

              <svg onClick={saveNewTask} data-value={props.title} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>

              {/* <ul className="list-group">
                <li className="list-group-item">Send to &rdqou;To-do&rdqou;</li>
                <li className="list-group-item">Send to &rdqou;Today&rdqou;</li>
                <li className="list-group-item">Send to &rdqou;Active&rdqou;</li>
              </ul> */}
              {/* <button
                onClick={plusbtn}
                data-value={props.id}
                value={props.status}
                className="btn btn-secondary btn-icon">
              {plusbtn}
              </button> */}



                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default TaskCard
