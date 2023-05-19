import React, { useState, MouseEvent, useEffect } from 'react'
import { Container, Nav } from 'react-bootstrap'

const Timer = () => {
    const [minutes, setMinutes] = useState<number>(25)
    const [seconds, setSeconds] = useState<number>(0)
    const [mode, setMode] = useState('work')
    const [contols, setContols] = useState({ state: false, event: 'toggle' })

    interface timeInterface {
        [key: string]: number
    }

    const time: timeInterface = {
        work: 25,
        shortBreak: 5,
        longBreak: 15,
    }

    const timerOptions = document.querySelector('.timer-options')
    const timerOptionsBtns = timerOptions?.querySelectorAll('button')

    function handleMode(e: MouseEvent<HTMLElement>) {
        timerOptionsBtns?.forEach((e) => {
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
                <div
                    className="display-1 mb-2"
                    style={{ fontFamily: 'GeneralSans-Bold' }}
                >
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
                <button className="btn btn-primary btn-lg" onClick={reset}>
                    Reset
                </button>
            </Container>
        </div>
    )
}

export default Timer
