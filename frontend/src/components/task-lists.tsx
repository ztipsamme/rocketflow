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
    const [listContent, isListContent] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [mobile, setMobile] = useState<boolean>()
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

    useEffect(() => {
        const statuses = [0, 1, 2, 3]
        statuses.forEach((e) => {
            const getTasksByStatus = (async () => {
                axios
                    .get(
                        'http://localhost:8080/api/get-task-status?status=' + e
                    )
                    .then((response) => {
                        if (e === 0) setToDo(response.data)
                        if (e === 1) setToday(response.data)
                        if (e === 2) setActiveTask(response.data)
                        if (e === 3) setDone(response.data)
                    })
                    .then(() => {
                        if (e === 3) ifMobile()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })()
        })

        window.addEventListener('load', () => {
            ifMobile()
            setWindowWidth(window.innerWidth)
        })
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
                const defaultMode: HTMLInputElement | null =
                    document.querySelector('#today')
                if (defaultMode !== null) defaultMode.checked = true

                const lists = document.querySelectorAll('.list')
                lists?.forEach((e) => {
                    if (e.className.includes('today')) {
                        e.classList.remove('hidden')
                    } else {
                        e.classList.add('hidden')
                    }
                })
                setMobile(true)
            } else {
                setMobile(false)
            }
        }
    }

    function handleMode(e: any) {
        const id = e.target?.id
        const list = e.target?.value
        const lists = document.querySelectorAll('.list')

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

        function checkIfEmptyList(list: tasksInterface[]) {
            if (list.length <= 0) {
                isListContent(false)
            } else {
                isListContent(true)
            }
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
                url: 'http://localhost:8080/api/update-task-status',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { id: id, status: state },
            })

            document.location.reload()
        }
    }

    function handleOnDragOver(event: React.DragEvent) {
        event.preventDefault()
        console.log('drag over')
    }

    return (
        <>
            <div
                className="activeTask"
                onDrop={handleOnDrop}
                onDragOver={handleOnDragOver}
            >
                <h2 className="h2-active">Active task</h2>
                <TaskList classes={'list-option-lists'} list={activeTask} />
            </div>

            {mobile && (
                <div className="lists">
                    <form className="pill-nav mode-btn" onChange={handleMode}>
                        <input
                            id="to-do"
                            type="radio"
                            value="toDo"
                            name="mode"
                        />
                        <label htmlFor="to-do" className="button">
                            To Do
                        </label>
                        <input
                            id="today"
                            type="radio"
                            value="today"
                            name="mode"
                        />
                        <label htmlFor="today" className="button">
                            Today
                        </label>
                        <input
                            id="done"
                            type="radio"
                            value="done"
                            name="mode"
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

                    {listContent ? (
                        <></>
                    ) : (
                        <p>You have not added any tasks yet</p>
                    )}
                    <div>
                        {lists.map((list) => (
                            <TaskList
                                classes={list.class + ' list'}
                                list={list.list}
                                key={list.h2}
                            />
                        ))}
                    </div>
                </div>
            )}

            {!mobile && (
                <>
                    {lists.map((list) => (
                        <div
                            className={list.class}
                            key={list.h2}
                            onDrop={handleOnDrop}
                            onDragOver={handleOnDragOver}
                        >
                            <h2>{list.h2}</h2>
                            {list.h2 === 'To do' && (
                                <button
                                    className="add-task"
                                    onClick={handleAddCard}
                                >
                                    Add task
                                </button>
                            )}
                            <TaskList classes={'list'} list={list.list} />
                        </div>
                    ))}
                </>
            )}
        </>
    )
}

export default TaskLists
