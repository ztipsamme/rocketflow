import React, { useState, useEffect } from 'react'
import soundfile from '../assets/audio/audio.mp3'
const audioplay: HTMLAudioElement = new Audio(soundfile) //new Audio('/Audio.mp3')

const Timer = () => {
    interface timeInterface {
        [key: string]: number
    }

    const time: timeInterface = {
        work: 0,
        shortBreak: 5,
        longBreak: 15,
    }
    const [minutes, setMinutes] = useState<number>(time.work)
    const [seconds, setSeconds] = useState<number>(5)
    const [mode, setMode] = useState('work')
    const [contols, setContols] = useState({
        state: 'pause',
        event: 'toggle',
        text: 'Start',
    })

    const resetIcon = (
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
    )

    function handleMode(e: any) {
        const setting = e.target.value
        console.log(setting)

        setMode(setting)
        setMinutes(time[setting])
        setContols({ state: 'pause', event: 'mode', text: 'Start' })
    }

    useEffect(() => {
        if (contols.state === 'pause') {
            if (contols.event === 'mode') {
                // resets to default values
                setSeconds(5) //set seconds
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
          audioplay.play()
          audioplay.loop = true
            setContols({ state: 'pause', event: 'toggle', text: 'Stop' })
        }
    }, [seconds, contols])

    useEffect(() => {
        const defaultMode: any = document.querySelector('#work')
        if (defaultMode !== null) defaultMode.checked = true
    }, [])

    function reset () {
      audioplay.pause();
      setContols({ state: 'pause', event: 'mode', text: 'Start' });
      setMinutes(time[mode]);
    }

    return (
        <div className="Timer">
            <form className="pill-nav timer-options" onChange={handleMode}>
                <input id="work" type="radio" value="work" name="timer" />
                <label htmlFor="work" className="button">
                    Pomodoro
                </label>
                <input
                    id="shortBreak"
                    type="radio"
                    value="shortBreak"
                    name="timer"
                />
                <label htmlFor="shortBreak" className="button">
                    Short Break
                </label>
                <input
                    id="longBreak"
                    type="radio"
                    value="longBreak"
                    name="timer"
                />
                <label htmlFor="longBreak" className="button">
                    Long Break
                </label>
            </form>

            <div className="timer-clock">
                {minutes.toString().padStart(2, '0') +
                    ':' +
                    seconds.toString().padStart(2, '0')}
            </div>
            <div className="timer-btns">
                <button
                    className="start"
                    onClick={() => {
                        if (contols.text === 'Start') {
                            setContols({
                                state: 'on',
                                event: 'toggle',
                                text: 'Pause',
                            })
                        } else if (contols.text === 'Pause') {
                            setContols({
                                state: 'pause',
                                event: 'toggle',
                                text: 'Start',
                            })
                        } else if (contols.text === 'Stop') {
                          reset()
                        }
                    }}
                >
                    {contols.text}
                </button>
                <button className="reset icon" onClick={reset}>
                    {resetIcon}
                </button>
            </div>
        </div>
    )
}

export default Timer
