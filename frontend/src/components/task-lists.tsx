import React, { useEffect, useState, MouseEvent } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import TaskCard from './task-card'

interface tasksInterface {
    id: string
    title: string
    description: string
    status: number
    created: string
}

const TaskLists: React.FC = () => {
    const [tasks, setTasks] = useState<tasksInterface[]>([])
    const [toDo, setToDo] = useState<tasksInterface[]>([])
    const [today, setToday] = useState<tasksInterface[]>([])
    const [activeTask, setActiveTask] = useState<tasksInterface[]>([])
    const [done, setDone] = useState<tasksInterface[]>([])
    const btnWidth = {
        width: '100%',
    }

    const getTasks = async () => {
        await axios
            .get('http://localhost:8080/api/get-tasks')
            .then((response) => {
                setTasks(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getToDo = async () => {
        await axios
            .get('http://localhost:8080/api/get-to-do')
            .then((response) => {
                setToDo(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getToday = async () => {
        await axios
            .get('http://localhost:8080/api/get-today')
            .then((response) => {
                setToday(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getActiveTask = async () => {
        await axios
            .get('http://localhost:8080/api/get-active-task')
            .then((response) => {
                setActiveTask(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getDone = async () => {
        await axios
            .get('http://localhost:8080/api/get-done')
            .then((response) => {
                setDone(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getTasks()
        getToDo()
        getToday()
        getActiveTask()
        getDone()
    }, [])

    function handleMode(e: MouseEvent<HTMLElement>) {
        const modes = document.querySelector('#list-options')
        const modeBtns = modes?.querySelectorAll('button')
        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.add('active')
    }

    return (
        <div>
            <h2 className="mb-1 body-text">Active task</h2>
            <ListGroup>
                {activeTask.map((value) => (
                    <li
                        key={value.id}
                        style={{ listStyle: 'none' }}
                        className="mb-2"
                    >
                        <TaskCard
                            id={value.id}
                            title={value.title}
                            description={value.description}
                            status={value.status}
                        />
                    </li>
                ))}
            </ListGroup>

            <div>
                <nav id="list-options" className="card glass border mt-6 mb-4">
                    <ul className="nav nav-pills card-body row">
                        <li className="nav-item col">
                            <button
                                className="btn nav-link link-secondary active col"
                                style={btnWidth}
                                onClick={handleMode}
                            >
                                Todo
                            </button>
                        </li>
                        <li className="nav-item col">
                            <button
                                className="btn nav-link link-secondary col"
                                style={btnWidth}
                                onClick={handleMode}
                            >
                                Today
                            </button>
                        </li>
                        <li className="nav-item col">
                            <button
                                className="btn nav-link link-secondary col"
                                style={btnWidth}
                                onClick={handleMode}
                            >
                                Distractions
                            </button>
                        </li>
                    </ul>
                </nav>
                <ul className="p-0">
                    <ListGroup>
                        {toDo.map((value) => (
                            <li
                                key={value.id}
                                style={{ listStyle: 'none' }}
                                className="mb-2"
                            >
                                <TaskCard
                                    id={value.id}
                                    title={value.title}
                                    description={value.description}
                                    status={value.status}
                                />
                            </li>
                        ))}
                    </ListGroup>
                    <ListGroup>
                        {today.map((value) => (
                            <li
                                key={value.id}
                                style={{ listStyle: 'none' }}
                                className="mb-2"
                            >
                                <TaskCard
                                    id={value.id}
                                    title={value.title}
                                    description={value.description}
                                    status={value.status}
                                />
                            </li>
                        ))}
                    </ListGroup>
                    <ListGroup>
                        {done.map((value) => (
                            <li
                                key={value.id}
                                style={{ listStyle: 'none' }}
                                className="mb-2"
                            >
                                <TaskCard
                                    id={value.id}
                                    title={value.title}
                                    description={value.description}
                                    status={value.status}
                                />
                            </li>
                        ))}
                    </ListGroup>
                </ul>
            </div>
        </div>
    )
}

export default TaskLists
