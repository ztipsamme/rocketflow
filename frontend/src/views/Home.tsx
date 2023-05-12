import React from 'react'
import rocket from '../assets/images/elastic-guy-flying-on-a-rocket-1.png'
import clock from '../assets/images/clock.svg'
import listCheck from '../assets/images/list-check.svg'
import lightbulb from '../assets/images/lightbulb.svg'

function Home() {
    return (
        <div className="Home">
            <section className="hero">
                <h1>Get your work done at warp speed</h1>
                <p>Take control of your tasks with an all-in-one solution</p>
                <button>Try for free</button>
                <img src={rocket} alt="Elastic guy flying on a rocket" />
            </section>
            <section className="info">
                <article>
                    <h2>Productivity Booster</h2>
                    <p>
                        Put your workflow on autopilot, prioritize you task and
                        eleminate distractions without going off course.
                    </p>
                </article>
                <div className="cards">
                    <div className="card">
                        <img src={clock} alt="A clock" />

                        <h3>Pomodoro timer</h3>
                        <p>
                            The timer helps you do focused work, remainds you of
                            taking breaks and finish tasks.
                        </p>
                    </div>
                    <div className="card">
                        <img src={listCheck} alt="A list with checkmarks" />

                        <h3>Task board</h3>
                        <p>
                            Structures your tasks and helps you prioritize you
                            work during the day.
                        </p>
                    </div>
                    <div className="card">
                        <img src={lightbulb} alt="A lightbulb" />

                        <h3>Distraction list</h3>
                        <p>
                            Let&apos;s you put all distractions in one place so
                            that you can focus on them later.
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <h2>Ready for lift off?</h2>
                <button>Let&apos;s go!</button>
                <p>
                    Warning! Maximizing your productivity will free up time for
                    firends, family and cause peace of mind.
                </p>
            </section>
        </div>
    )
}

export default Home
