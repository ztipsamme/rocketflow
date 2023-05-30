import React, { MouseEvent } from 'react'
import TaskLists from '../components/task-lists'
import Timer from '../components/timer'

const Pomodoro = () => {
    function handleMode(e: MouseEvent<HTMLElement>) {
        const modes = document.querySelector('.display-options')
        const modeBtns = modes?.querySelectorAll('button')
        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.add('active')
    }

    return (
        <div className="Pomodoro">
            <h1 style={{ display: 'none' }}>Pomodoro</h1>
            <nav className="pill-nav display-options">
                <button className="active" onClick={handleMode}>
                    Pomodoro
                </button>

                <button onClick={handleMode}>Distractions</button>
            </nav>
            <Timer />
            <TaskLists />
        </div>
    )
}

export default Pomodoro
