import React from 'react'
import DragNDrop from '../components/drag-n-drop'
import Timer from '../components/timer'

const Pomodoro = () => {
    const btnWidth = {
        width: '100%',
    }

    return (
        <>
            <h1 style={{ display: 'none' }}>Pomodoro</h1>
            <nav className="card glass border mt-6 mb-4">
                <ul className="nav nav-pills secondary card-body row">
                    <li className="nav-item col">
                        <button
                            className="btn nav-link active"
                            style={btnWidth}
                        >
                            Pomodoro
                        </button>
                    </li>
                    <li className="nav-item col">
                        <button
                            className="btn nav-link link-secondary"
                            style={btnWidth}
                        >
                            Tasks
                        </button>
                    </li>
                    <li className="nav-item col">
                        <button
                            className="btn nav-link link-secondary"
                            style={btnWidth}
                        >
                            Distractions
                        </button>
                    </li>
                </ul>
            </nav>
            <Timer />
            <h2 className="mb-1">Active task</h2>
            <DragNDrop />
        </>
    )
}

export default Pomodoro
