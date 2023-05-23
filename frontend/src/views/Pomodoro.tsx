import React, { MouseEvent } from 'react'
import TaskLists from '../components/task-lists'
import Timer from '../components/timer'
import Test from '../components/test'

const Pomodoro = () => {
    const btnWidth = {
        width: '100%',
    }

    function handleMode(e: MouseEvent<HTMLElement>) {
        const modes = document.querySelector('#display-options')
        const modeBtns = modes?.querySelectorAll('button')
        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.add('active')
    }

    return (
        <>
            <h1 style={{ display: 'none' }}>Pomodoro</h1>
            <nav className="card glass border mt-6 mb-4" id="display-options">
                <ul className="nav nav-pills card-body row">
                    <li className="nav-item col">
                        <button
                            className="btn nav-link link-secondary active"
                            style={btnWidth}
                            onClick={handleMode}
                        >
                            Pomodoro
                        </button>
                    </li>
                    <li className="nav-item col">
                        <button
                            className="btn nav-link link-secondary"
                            style={btnWidth}
                            onClick={handleMode}
                        >
                            Distractions
                        </button>
                    </li>
                </ul>
            </nav>

            <Timer />
            <TaskLists />
            {/* <Test /> */}
        </>
    )
}

export default Pomodoro
