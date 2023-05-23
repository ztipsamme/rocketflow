import React, { useEffect, useState, MouseEvent } from 'react'
import { ListGroup } from 'react-bootstrap'
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
    const [toDo, setToDo] = useState<tasksInterface[]>([])
    const [today, setToday] = useState<tasksInterface[]>([])
    const [activeTask, setActiveTask] = useState<tasksInterface[]>([])
    const [done, setDone] = useState<tasksInterface[]>([])
    const [windowWidth, setWindowWidth] = useState<number | undefined>()
    const btnWidth = {
        width: '100%',
    }
    const overlay: object = {
        position: 'absolute',
        left: 0,
        width: '100%',
        borderRadius: '8px   8px 0 0',
        borderTop: '1px solid #fff',
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

    window.addEventListener('load', () => {
        setWindowWidth(window.innerWidth)
    })

    useEffect(() => {
        getToDo()
        getToday()
        getActiveTask()
        getDone()

        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    }, [])

    function handleMode(e: MouseEvent<HTMLElement>) {
        const modeBtns = document
            .querySelector('#list-option-btns')
            ?.querySelectorAll('button')
        const modesLists = document
            .querySelector('.list-option-lists')
            ?.querySelectorAll('.list-group')
        const listOption = e.currentTarget.innerHTML

        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.add('active')

        if (windowWidth !== undefined && windowWidth < 900) {
            if (listOption === 'To do') {
                updateActiveList('to-do')
            } else if (listOption === 'Today') {
                updateActiveList('today')
            } else if (listOption === 'Done') {
                updateActiveList('done')
            }
        }

        function updateActiveList(list: string) {
            modesLists?.forEach((e) => {
                e.classList.add('hidden')
            })
            document.querySelector(`#${list}`)?.classList.remove('hidden')
        }
    }

    return (
        <div>
            <h2 className="mb-1 body-text">Active task</h2>
            <ListGroup id="active">
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

            <div
                className="glass list-option-lists glass mt-6 pt-3 px-2"
                style={overlay}
            >
                <nav id="list-option-btns" className="card glass border mb-4">
                    <ul className="nav nav-pills card-body row">
                        <li className="nav-item col">
                            <button
                                className="btn nav-link link-secondary active col"
                                style={btnWidth}
                                onClick={handleMode}
                            >
                                To do
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
                                Done
                            </button>
                        </li>
                    </ul>
                </nav>
                <ul className="list-option-lists p-0">
                    <ListGroup id="to-do">
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
                    <ListGroup id="today" className="hidden">
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
                    <ListGroup id="done" className="hidden">
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
