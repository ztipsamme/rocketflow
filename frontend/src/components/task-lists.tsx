import React, { useEffect, useState, MouseEvent } from 'react'
import axios from 'axios'
import TaskCard from './task-card'

interface tasksInterface {
    id: string
    title: string
    description: string
    status: number
    created: string
}

const TaskLists = () => {
    const [toDo, setToDo] = useState<tasksInterface[]>([])
    const [today, setToday] = useState<tasksInterface[]>([])
    const [activeTask, setActiveTask] = useState<tasksInterface[]>([])
    const [done, setDone] = useState<tasksInterface[]>([])
    const [noCardsText, setNoCardsText] = useState(true)
    const [windowWidth, setWindowWidth] = useState<number | undefined>()
    const overlay: object = {
        position: 'absolute',
        left: 0,
        width: '100%',
        borderRadius: '8px   8px 0 0',
        borderTop: '1px solid #fff',
    }
    const plusIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-circle-fill"
            viewBox="0 0 16 16"
        >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
    )

    const getTasksByStatus = async (status: number) => {
        await axios
            .get('http://localhost:8080/api/get-task-status?status=' + status)
            .then((response) => {
                if (status === 0) setToDo(response.data)
                if (status === 1) setToday(response.data)
                if (status === 2) setActiveTask(response.data)
                if (status === 3) setDone(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    window.addEventListener('load', () => {
        setWindowWidth(window.innerWidth)
    })

    useEffect(() => {
        const statuses = [0, 1, 2, 3]
        statuses.forEach((e) => {
            getTasksByStatus(e)
        })

        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        ;[toDo, today, done].forEach((e) => {
            checkIfEmptyList(e)
        })
    }, [])

    function handleMode(e: MouseEvent<HTMLElement>) {
        const modeBtns = document
            .querySelector('.list-option-btns')
            ?.querySelectorAll('button')
        const modesLists = document.querySelectorAll('.lists')
        const listOption = e.currentTarget.innerHTML

        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.add('active')

        if (windowWidth !== undefined && windowWidth < 900) {
            if (listOption === 'To do') {
                updateActiveList('to-do')
                checkIfEmptyList(toDo)
            } else if (listOption === 'Today') {
                updateActiveList('today')
                checkIfEmptyList(today)
            } else if (listOption === 'Done') {
                updateActiveList('done')
                checkIfEmptyList(done)
            }
        }

        function updateActiveList(list: string) {
            modesLists?.forEach((e) => {
                e.classList.add('hidden')
            })
            document.querySelector(`#${list}`)?.classList.remove('hidden')
        }
    }

    const handleAddCard = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/add-task',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                title: 'Heading goes here',
                description: 'Describe the task',
            },
        })
        document.location.reload()
    }

    function checkIfEmptyList(list: tasksInterface[]) {
        if (list.length <= 0) {
            setNoCardsText(false)
        } else {
            setNoCardsText(true)
            console.log('hah')
        }
    }

    return (
        <div>
            <h2>Active task</h2>
            <ul id="active" className="list-option-lists">
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
            </ul>

            <div className="list-option-lists" style={overlay}>
                <nav className="list-option-btns">
                    <ul>
                        <li>
                            <button onClick={handleMode}>To do</button>
                        </li>
                        <li>
                            <button className="active" onClick={handleMode}>
                                Today
                            </button>
                        </li>
                        <li>
                            <button onClick={handleMode}>Done</button>
                        </li>
                    </ul>
                </nav>

                <div>
                    <button className="icon plus-icon" onClick={handleAddCard}>
                        {plusIcon}
                    </button>
                    {noCardsText ? (
                        <></>
                    ) : (
                        <p>You have not added any tasks yet</p>
                    )}
                </div>

                <ul className="list-option-lists">
                    <ul id="to-do" className="lists hidden">
                        {toDo.map((value) => (
                            <li key={value.id} style={{ listStyle: 'none' }}>
                                <TaskCard
                                    id={value.id}
                                    title={value.title}
                                    description={value.description}
                                    status={value.status}
                                />
                            </li>
                        ))}
                    </ul>
                    <ul id="today" className="lists">
                        {today.map((value) => (
                            <li key={value.id} style={{ listStyle: 'none' }}>
                                <TaskCard
                                    id={value.id}
                                    title={value.title}
                                    description={value.description}
                                    status={value.status}
                                />
                            </li>
                        ))}
                    </ul>
                    <ul id="done" className="lists hidden">
                        {done.map((value) => (
                            <li key={value.id} style={{ listStyle: 'none' }}>
                                <TaskCard
                                    id={value.id}
                                    title={value.title}
                                    description={value.description}
                                    status={value.status}
                                />
                            </li>
                        ))}
                    </ul>
                </ul>
            </div>
        </div>
    )
}

export default TaskLists
