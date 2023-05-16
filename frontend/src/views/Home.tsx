import React from 'react'
import { Link } from 'react-router-dom'
import rocket from '../assets/images/elastic-guy-flying-on-a-rocket-1.png'
import clock from '../assets/images/clock.svg'
import listCheck from '../assets/images/list-check.svg'
import lightbulb from '../assets/images/lightbulb.svg'

function Home() {
    return (
        <div className="Home">
            <section className="hero text-center">
                <h1>Get your work done at warp speed</h1>
                <p>Take control of your tasks with an all-in-one solution</p>
                <Link to="/pomodoro" className="btn btn-primary">
                    Try for free
                </Link>

                <img src={rocket} alt="Elastic guy flying on a rocket" />
            </section>
            <section className="info">
                <div className="text-center">
                    <h2>Productivity Booster</h2>
                    <p>
                        Put your workflow on autopilot, prioritize you task and
                        eleminate distractions without going off course.
                    </p>
                </div>
                <div>
                    <div className="card mb-3" style={{ maxWidth: '540px' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={clock}
                                    className="img-fluid rounded-start"
                                    alt="A clock"
                                />
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">Pomodoro timer</h3>
                                <p className="card-text">
                                    The timer helps you do focused work,
                                    remainds you of taking breaks and finish
                                    tasks.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={listCheck}
                                    className="img-fluid rounded-start"
                                    alt="A list with checkmarks"
                                />
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">Task board</h3>
                                <p className="card-text">
                                    Structures your tasks and helps you
                                    prioritize you work during the day.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                    src={lightbulb}
                                    className="img-fluid rounded-start"
                                    alt="A lightbulb"
                                />
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title">Distraction list</h3>
                                <p className="card-text">
                                    Let&apos;s you put all distractions in one
                                    place so that you can focus on them later.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center">
                <h2>Ready for lift off?</h2>
                <Link to="/pomodoro" className="btn btn-primary">
                    Let&apos;s go!
                </Link>
                <p>
                    Warning! Maximizing your productivity will free up time for
                    firends, family and cause peace of mind.
                </p>
            </section>
        </div>
    )
}

export default Home
