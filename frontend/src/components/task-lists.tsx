import React, { useEffect, useState, MouseEvent } from 'react'
import axios from 'axios'
import TaskList from './task-list'

export interface tasksInterface {
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
    const lists = [
        { class: 'to-do', list: toDo, h2: 'To do' },
        { class: 'today', list: today, h2: 'Today' },
        { class: 'done', list: done, h2: 'Done' },
    ]
    const [radio, setRadio] = useState('today')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [mobile, setMobile] = useState<boolean>()
    const appHeight = document.querySelector('.App')?.clientHeight
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

    function getAPI() {
        const statuses = [0, 1, 2, 3]

        statuses.forEach((e) => {
            const getTasksByStatus = (async () => {
                axios
                    .get('/api/get-task-status?status=' + e)
                    .then((response) => {
                        if (e === 0) setToDo(response.data)
                        if (e === 1) setToday(response.data)
                        if (e === 2) setActiveTask(response.data)
                        if (e === 3) setDone(response.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })()
        })
    }

    useEffect(() => {
        window.addEventListener('load', () => {
            ifMobile()
            setWindowWidth(window.innerWidth)
        })

        getAPI()
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            ifMobile()
            setWindowWidth(window.innerWidth)
        })
    }, [windowWidth])

    function ifMobile() {
        if (windowWidth !== undefined) {
            if (windowWidth < 1024) {
                setMobile(true)
                // console.log(appHeight)
                // console.log(window.innerHeight)
                // if (appHeight !== undefined) {
                //     setMinHeight(window.innerHeight - appHeight / 2 - 48 + 'px')
                //     console.log(window.innerHeight - appHeight / 2 - 48 + 'px')
                // }
            } else {
                setMobile(false)
            }
        }
    }

    function handleMode(e: any) {
        const id = e.target?.id

        if (windowWidth !== undefined && windowWidth < 1024) {
            setRadio(id)
        }
    }

    const handleAddCard = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: '/api/add-task',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                title: 'Heading goes here',
                description: 'Describe the task',
            },
        }).then(() => {
            getAPI()
        })
    }

    function handleOnDrop(e: React.DragEvent) {
        const id = e.dataTransfer.getData('card-id') as string
        const event = e.currentTarget.classList

        if (event.contains('to-do')) {
            updateState(id, 0)
        } else if (event.contains('today')) {
            updateState(id, 1)
        } else if (event.contains('activeTask')) {
            updateState(id, 2)
        } else if (event.contains('done')) {
            updateState(id, 3)
        }

        function updateState(id: string | null, state: number) {
            axios({
                method: 'put',
                url: '/api/update-task-status',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { id: id, status: state },
            }).then(() => {
                getAPI()
            })
        }
    }

    function handleOnDragOver(event: React.DragEvent) {
        event.preventDefault()
    }

    return (
        <>
            <div
                className="activeTask"
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
            >
                <h2 className="h2-active">Active task</h2>
                <TaskList
                    classes={'list-option-lists'}
                    list={activeTask}
                    runAPI={getAPI}
                />
            </div>

            {window.innerWidth < 1024 || mobile ? (
                <div
                    className="lists"
                    style={{
                        minHeight:
                            (appHeight !== undefined
                                ? window.innerHeight - appHeight - 48
                                : 0) + 'px',
                    }}
                >
                    <form className="pill-nav mode-btn">
                        <input
                            id="to-do"
                            type="radio"
                            value="toDo"
                            name="mode"
                            checked={radio === 'to-do'}
                            onChange={handleMode}
                        />
                        <label htmlFor="to-do" className="button">
                            To Do
                        </label>
                        <input
                            id="today"
                            type="radio"
                            value="today"
                            name="mode"
                            checked={radio === 'today'}
                            onChange={handleMode}
                        />
                        <label htmlFor="today" className="button">
                            Today
                        </label>
                        <input
                            id="done"
                            type="radio"
                            value="done"
                            name="mode"
                            checked={radio === 'done'}
                            onChange={handleMode}
                        />
                        <label htmlFor="done" className="button">
                            Done
                        </label>
                    </form>

                    <button
                        className=" add-task icon plus-icon"
                        onClick={handleAddCard}
                    >
                        {plusIcon}
                    </button>

                    <div>
                        {lists.map(
                            (list) =>
                                radio === list.class && (
                                    <TaskList
                                        classes={list.class + ' list'}
                                        list={list.list}
                                        key={list.h2}
                                        runAPI={getAPI}
                                    />
                                )
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {lists.map((list) => (
                        <div
                            className={list.class}
                            key={list.h2}
                            onDrop={handleOnDrop}
                            onDragOver={handleOnDragOver}
                        >
                            <h2>{list.h2}</h2>
                            <div className="list-area">
                                {list.h2 === 'To do' && (
                                    <button
                                        className="add-task"
                                        onClick={handleAddCard}
                                    >
                                        Add task
                                    </button>
                                )}
                                <TaskList
                                    classes={'list'}
                                    list={list.list}
                                    runAPI={getAPI}
                                />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default TaskLists
