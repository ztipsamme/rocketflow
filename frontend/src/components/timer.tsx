import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'

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
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    pomodoro(values)
                    actions.setSubmitting(false)
                }}
            >
                <Form>
                    <label htmlFor="work">Work</label>
                    <Field id="work" name="work" placeholder="0" />

                    {/* <label htmlFor="breakShort">Short Break</label>
                    <Field id="breakShort" name="breakShort" placeholder="0" />

                    <label htmlFor="breakLong">Long break</label>
                    <Field id="breakLong" name="breakLong" placeholder="0" /> */}
                    <button type="submit">Start</button>
                </Form>
            </Formik>
            <div>{time}</div>
        </div>
    )
}

export default Timer
