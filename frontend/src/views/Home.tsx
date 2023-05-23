import React from 'react'
import { Link } from 'react-router-dom'
import rocket from '../assets/images/elastic-guy-flying-on-a-rocket-1.png'
import clock from '../assets/images/clock.svg'
import listCheck from '../assets/images/list-check.svg'
import lightbulb from '../assets/images/lightbulb.svg'
import { Card, Container } from 'react-bootstrap'

function Home() {
    return (
        <>
            <Container id="Hero" className="text-center mt-12 mb-12">
                <h1>Get your work done at warp speed</h1>
                <p>Take control of your tasks with an all-in-one solution</p>
                <Link to="/pomodoro" className="btn btn-primary btn-sm">
                    Try for free
                </Link>

                <img
                    src={rocket}
                    style={{ width: '100%' }}
                    alt="Elastic guy flying on a rocket"
                />
            </Container>
            <Container className="mb-12">
                <div className="text-center mb-3">
                    <h2>Prodoctivity booster</h2>
                    <p>
                        Put your workflow on autopilot, prioritize your tasks
                        and eleminate distractions without going of course.
                    </p>
                </div>
                <Card className="mb-1 p-2">
                    <Card.Img src={clock}></Card.Img>
                    <Card.Body>
                        <Card.Title className="h3">Pomodoro timer</Card.Title>
                        <Card.Text>
                            The timer helps you do focused work, remainds you of
                            taking breaks and finish tasks.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-1 p-2">
                    <Card.Img src={listCheck}></Card.Img>
                    <Card.Body>
                        <Card.Title className="h3">Distraction list</Card.Title>
                        <Card.Text>
                            Let&apos;s you put all distractions in one place so
                            that you can focus on them later.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="p-2">
                    <Card.Img src={lightbulb}></Card.Img>
                    <Card.Body>
                        <Card.Title className="h3">Pomodoro timer</Card.Title>
                        <Card.Text>
                            The timer helps you do focused work, remainds you of
                            taking breaks and finish tasks.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <Container className="text-center mb-5">
                <h2 className="mb-3">Ready for lift off?</h2>
                <Link to="/pomodoro" className="btn btn-primary btn-sm">
                    Let&apos;s go!
                </Link>
                <p className="mt-3">
                    Warning! Maximizing your productivity will free up time for
                    friends, family and cause peace of mind.
                </p>
            </Container>
        </>
    )
}

export default Home
