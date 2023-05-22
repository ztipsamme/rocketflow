import React, { useState, MouseEvent, useEffect } from 'react'
import { Container, Nav } from 'react-bootstrap'

const Timer = () => {
    interface timeInterface {
        [key: string]: number
    }

    const time: timeInterface = {
        work: 25,
        shortBreak: 5,
        longBreak: 15,
    }

    const [minutes, setMinutes] = useState<number>(time.work)
    const [seconds, setSeconds] = useState<number>(0)
    const [mode, setMode] = useState('work')
    const [contols, setContols] = useState({ state: false, event: 'toggle' })

    const modes = document.querySelector('.timer-options')
    const modeBtns = modes?.querySelectorAll('button')

    function handleMode(e: MouseEvent<HTMLElement>) {
        modeBtns?.forEach((e) => {
            e.classList.remove('active')
        })
        e.currentTarget.classList.add('active')
        setMode(e.currentTarget.id)
        setMinutes(time[e.currentTarget.id])
        setContols({ state: false, event: 'mode' })
    }

    useEffect(() => {
        if (!contols.state) {
            if (contols.event === 'mode') {
                // resets to default values
                setSeconds(0)
            }
            return
        }
        const interval = setInterval(() => {
            clearInterval(interval)
            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                }
            } else {
                setSeconds(seconds - 1)
            }
        }, 1000)

        if (minutes === 0 && seconds === 0) {
            reset()
        }
    }, [seconds, contols])

    function reset() {
        setContols({ state: false, event: 'mode' })
        setMinutes(time[mode])
    }

    return (
        <div className="Timer">
            <Nav
                className="timer-options justify-content-between"
                data-bs-theme="dark"
            >
                <button
                    id="work"
                    className="btn nav-link link-secondary active"
                    onClick={handleMode}
                >
                    Pomodoro
                </button>
                <button
                    id="shortBreak"
                    className="btn nav-link link-secondary"
                    onClick={handleMode}
                >
                    Short Break
                </button>
                <button
                    id="longBreak"
                    className="btn nav-link link-secondary"
                    onClick={handleMode}
                >
                    Long Break
                </button>
            </Nav>
            <Container className="text-center mb-6">
                <div className="mb-2 display-1">
                    {minutes.toString().padStart(2, '0') +
                        ':' +
                        seconds.toString().padStart(2, '0')}
                </div>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        !contols.state
                            ? setContols({ state: true, event: 'toggle' })
                            : setContols({ state: false, event: 'toggle' })
                    }}
                >
                    {!contols.state ? 'Start' : 'Pause'}
                </button>
                <button className="btn btn-secondary btn-icon" onClick={reset}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-counterclockwise"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                        />
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>
                </button>
            </Container>
        </div>
    )
}

export default Timer
