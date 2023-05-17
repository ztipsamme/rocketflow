import React, { useEffect, useState } from 'react'
// import { Formik, Form, Field } from 'formik'

interface MyFormValues {
    work: number
    breakShort: number
    breakLong: number
}

const Timer = () => {
    const initialValues: MyFormValues = {
        work: 0,
        breakShort: 0,
        breakLong: 0,
    }
    const [intervals, setIntervals] = useState(initialValues)
    const [time, setTime] = useState('00:00')
    const pomodoro = async (x: MyFormValues) => {
        for (const [_key, value] of Object.entries(x)) {
            countdown(value)
        }
    }

    const countdown = async (x: number) => {
        const stopTime = new Date().getTime() + x * 60000
        const timer = await setInterval(() => {
            const startTime = new Date().getTime()
            const timeLeft = stopTime - startTime
            let minutes: string | number = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            )
            let seconds: string | number = Math.floor(
                (timeLeft % (1000 * 60)) / 1000
            )
            if (minutes < 10) minutes = '0' + minutes
            if (seconds < 10) seconds = '0' + seconds
            if (seconds === 0) seconds = '00'
            setTime(minutes.toString() + ':' + seconds.toString())
            if (timeLeft < 0) {
                clearInterval(timer)
                setTime('STOP')
                return
            }
        }, 1000)
    }

    return (
        <div className="Timer">
            {
                // <Formik
                //     initialValues={initialValues}
                //     onSubmit={(values, actions) => {
                //         pomodoro(values)
                //         actions.setSubmitting(false)
                //     }}
                // >
                //     <Form>
                //         <label htmlFor="work">Work</label>
                //         <Field id="work" name="work" placeholder="0" />
                //         <button type="submit">Start</button>
                //     </Form>
                // </Formik>
            }

            <nav className="card glass border">
                <ul className="nav nav-pills secondary card-body row">
                    <li className="nav-item col">
                        <button className="btn nav-link active">
                            Pomodoro
                        </button>
                    </li>
                    <li className="nav-item col">
                        <button className="btn nav-link link-secondary">
                            Tasks
                        </button>
                    </li>
                    <li className="nav-item col">
                        <button className="btn nav-link link-secondary">
                            Distractions
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="timer-options nav secondary">
                <button className="btn nav-link link-secondary active">
                    Pomodoro
                </button>
                <button className="btn nav-link link-secondary">
                    Short Break
                </button>
                <button className="btn nav-link link-secondary">
                    Long Break
                </button>
                <div>{time}</div>
                <button className="btn btn-primary">Start</button>
            </div>
        </div>
    )
}

export default Timer
