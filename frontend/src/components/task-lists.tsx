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
    const [desktop, setDesktop] = useState<boolean>()
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
        ifMobile()
    })

    useEffect(() => {
        const statuses = [0, 1, 2, 3]
        statuses.forEach((e) => {
            getTasksByStatus(e)
        })

        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })

        ifDesktop()
    }, [])

    function ifMobile() {
        if (window.innerWidth !== undefined && window.innerWidth < 1024) {
            const defaultMode: any = document.querySelector('#today')
            if (defaultMode !== null) defaultMode.checked = true
            document.querySelectorAll('.list').forEach((e) => {
                if (!e.classList.contains('today')) e.classList.add('hidden')
            })
        }
    }

    function ifDesktop() {
        if (window.innerWidth !== undefined && window.innerWidth >= 1024) {
            setDesktop(true)
            document.querySelector('.add-task')?.classList.remove('icon')
            // document.querySelector('.add-task')?.classList.add('button')
        } else {
            setDesktop(false)
        }
    }

    function handleMode(e: any) {
        console.log(e)
        const id = e.target.id
        const list = e.target.value
        const lists = document.querySelectorAll('.list')
        const modeBtns = document.querySelectorAll('.mode-btn>label')

        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.target.classList.add('active')

        if (windowWidth !== undefined && windowWidth < 1024) {
            lists?.forEach((e) => {
                if (e.className.includes(id)) {
                    e.classList.remove('hidden')
                } else {
                    e.classList.add('hidden')
                }
            })

            switch (list) {
                case 'toDo':
                    checkIfEmptyList(toDo)
                    break
                case 'today':
                    checkIfEmptyList(today)
                    break
                case 'done':
                    checkIfEmptyList(done)
                    break
            }
        }
    }

    function checkIfEmptyList(list: tasksInterface[]) {
        if (list.length <= 0) {
            setNoCardsText(false)
        } else {
            setNoCardsText(true)
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

    return (
        <>
            <div className="activeTask">
                <h2 className="h2-active">Active task</h2>
                <ul id="active" className="list-option-lists">
                    {activeTask.map((value) => (
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
            </div>

            {!desktop && (
                <form className="pill-nav mode-btn" onChange={handleMode}>
                    <input id="to-do" type="radio" value="toDo" name="mode" />
                    <label htmlFor="to-do" className="button">
                        To Do
                    </label>
                    <input id="today" type="radio" value="today" name="mode" />
                    <label htmlFor="today" className="button">
                        Today
                    </label>
                    <input id="done" type="radio" value="done" name="mode" />
                    <label htmlFor="done" className="button">
                        Done
                    </label>
                </form>
            )}

            <button
                className=" add-task icon plus-icon"
                onClick={handleAddCard}
            >
                {desktop ? 'Add Task' : plusIcon}
            </button>
            {noCardsText ? <></> : <p>You have not added any tasks yet</p>}

            {desktop && <h2 className="h2-to-do">To Do</h2>}
            <ul className="to-do list">
                {toDo.map((value) => (
                    <li key={value.id}>
                        <TaskCard
                            id={value.id}
                            title={value.title}
                            description={value.description}
                            status={value.status}
                        />
                    </li>
                ))}
            </ul>

            {desktop && <h2 className="h2-today">Today</h2>}
            <ul className="today list">
                {today.map((value) => (
                    <li key={value.id}>
                        <TaskCard
                            id={value.id}
                            title={value.title}
                            description={value.description}
                            status={value.status}
                        />
                    </li>
                ))}
            </ul>

            {desktop && <h2 className="h2-done">Done</h2>}
            <ul className="done list">
                {done.map((value) => (
                    <li key={value.id}>
                        <TaskCard
                            id={value.id}
                            title={value.title}
                            description={value.description}
                            status={value.status}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TaskLists
