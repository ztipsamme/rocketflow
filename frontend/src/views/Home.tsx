import React from 'react'
import { Link } from 'react-router-dom'
import rocket from '../assets/images/rocket.png'
import clock from '../assets/images/clock.svg'
import listCheck from '../assets/images/list-check.svg'
import lightbulb from '../assets/images/lightbulb.svg'

function Home() {
    const features = [
        {
            img: clock,
            title: 'Pomodoro timer',
            text: 'The timer helps you do focused work, remainds you of taking breaks and finish tasks.',
        },
        {
            img: listCheck,
            title: 'Task Board',
            text: 'Structures your tasks and helps you prioritize your work during the day.',
        },
        {
            img: lightbulb,
            title: 'Distraction list',
            text: 'The timer helps you do focused work, remainds you of taking breaks and finish tasks.',
        },
    ]

    return (
        <div id="Home">
            <section id="Hero">
                <section>
                    <h1>Get your work done at warp speed</h1>
                    <p className="h1-subheading">
                        Take control of your tasks with an all-in-one solution
                    </p>
                    <Link className="button" to="/pomodoro">
                        Try for free
                    </Link>
                </section>

                <img src={rocket} alt="Rocket" />
            </section>

            <section id="info">
                <section>
                    <h2>Prodoctivity booster</h2>
                    <p>
                        Put your workflow on autopilot, prioritize your tasks
                        and eleminate distractions without going of course.
                    </p>
                </section>

                <section>
                    {features.map((value) => (
                        <div className="card img-left" key={value.title}>
                            <img src={value.img} />
                            <div className="card-body">
                                <h3 className="card-title">{value.title}</h3>
                                <p className="card-text">{value.text}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </section>

            <section>
                <h2>Ready for lift off?</h2>
                <Link className="button" to="/pomodoro">
                    Let&apos;s go!
                </Link>
                <p>
                    <strong>Warning!</strong> Maximizing your productivity will
                    free up time for friends, family and cause peace of mind.
                </p>
            </section>
        </div>
    )
}

export default Home
