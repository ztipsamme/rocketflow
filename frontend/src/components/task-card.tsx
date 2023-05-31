import React, { useState, MouseEvent, useEffect } from 'react'
import axios from 'axios'

interface tasksInterface {
    id: string
    title: string
    description: string
    status: number
    runAPI: () => any
}

const TaskCard = (props: tasksInterface) => {
    const [cardOpen, setCardOpen] = useState(false)
    const [migrateOpen, setMigrateOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)

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
            <path d="M13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3zM2.19 3c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672a1 1 0 0 1 .707.293L7.586 3H2.19zm9.608 5.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z" />
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

    const toggleCard = (e: MouseEvent) => {
        if (cardOpen) {
            e.preventDefault()
            setCardOpen(false)
            setEditMode(false)

            axios({
                method: 'put',
                url: '/api/update-task-info',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    id: props.id,
                    title: title,
                    description: description,
                },
            }).then(() => {
                props.runAPI()
            })
            // document.location.reload()

            setMigrateOpen(false)
        } else {
            setCardOpen(true)
            setEditMode(true)
        }
    }

    const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        axios({
            method: 'delete',
            url: '/api/delete-task',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { id: props.id },
        }).then(() => {
            props.runAPI()
        })
        // document.location.reload()
    }

    const toggleMigrate = async (e: MouseEvent<HTMLButtonElement>) => {
        setMigrateOpen(true)
        e.preventDefault()
        if (migrateOpen) {
            setMigrateOpen(false)
        } else {
            setMigrateOpen(true)
        }
    }

    const handleMigrate = async (e: MouseEvent<HTMLLIElement>) => {
        e.preventDefault()
        const newStatus = Number(e.currentTarget.value)
        if (props.title !== title || props.description !== description) {
            axios({
                method: 'put',
                url: '/api/update-task-info',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    id: props.id,
                    status: newStatus,
                    title: title,
                    description: description,
                },
            })
            updateState(newStatus)
        } else {
            updateState(newStatus)
        }
    }

    const handleDone = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (props.status !== 3) {
            updateState(3)
        } else {
            updateState(0)
        }
    }

    function updateState(state: number) {
        axios({
            method: 'put',
            url: '/api/update-task-status',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { id: props.id, status: state },
        }).then(() => {
            props.runAPI()
        })

        // document.location.reload()
    }

    function handleSubmitTitle(e: { target: HTMLTextAreaElement }) {
        setTitle(e.target.value)
    }

    function handleSubmitDesc(e: { target: HTMLTextAreaElement }) {
        setDescription(e.target.value)
    }

    useEffect(() => {
        if (migrateOpen) {
            document
                .querySelector('.migrate-list')
                ?.childNodes.forEach((e: any) => {
                    if (props.status !== e.value) {
                        e.classList.add('show')
                        e.hidden = false
                    } else {
                        e.classList.remove('show')
                        e.hidden = true
                    }
                })
        }
    }, [migrateOpen])

    function handleOnDrag(event: React.DragEvent) {
        event.dataTransfer.setData('card-id', props.id)
    }

    useEffect(() => {
        props.runAPI()
        console.log('dfghjk')
    }, [])

    return (
        <div
            id="Card"
            draggable
            onDragStart={(event) => handleOnDrag(event)}
            key={props.id}
        >
            <div className="card">
                <div className="header">
                    {editMode ? (
                        <textarea
                            onChange={handleSubmitTitle}
                            value={title}
                            name="title"
                            autoFocus
                            className="card-title"
                        />
                    ) : (
                        <h3 className="card-title">{title}</h3>
                    )}

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
                    {editMode ? (
                        <textarea
                            onChange={handleSubmitDesc}
                            value={description}
                            name="description"
                            className="card-title"
                            rows={2}
                        />
                    ) : (
                        <p className="card-text">{description}</p>
                    )}
                    <div className="controls">
                        <button onClick={handleDelete} className="icon">
                            {trashCanIcon}
                        </button>
                        <button onClick={toggleMigrate} className="icon">
                            {migrationIcon}
                        </button>
                        <button onClick={handleDone} className="icon">
                            {checkboxIcon}
                        </button>
                    </div>
                </div>
            </div>
            {migrateOpen && (
                <ul className="migrate-list card">
                    <li value={0} onClick={handleMigrate}>
                        Send to <strong>To-do</strong>
                    </li>
                    <li value={1} onClick={handleMigrate}>
                        Send to <strong>Today</strong>
                    </li>
                    <li value={2} onClick={handleMigrate}>
                        Send to <strong>Active</strong>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default TaskCard
