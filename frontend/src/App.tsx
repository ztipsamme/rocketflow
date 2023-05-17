import React from 'react'
import {
    createHashRouter,
    Link,
    Outlet,
    RouterProvider,
} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'
import Contact from './views/Contact'
import Pomodoro from './views/Pomodoro'
import logo from './assets/images/logo.svg'

function Root() {
    return (
        <div className="App container-fluid bg-gradient text-white">
            <header>
                <div className="hb-menu"></div>
                <div className="menu">
                    <nav className="navbar navbar-expand-lg">
                        <Link to="/" className="navbar-brand">
                            <img
                                className="logo"
                                src={logo}
                                alt="Rocketflow logo"
                            />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul>
                                <li className="nav-item">
                                    <Link
                                        to="/pomodoro"
                                        className="btn btn-primary"
                                    >
                                        Try Rocketflow
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <Outlet />
            <footer>
                <Link to="/" className="logo">
                    <img className="logo" src={logo} alt="Rocketflow logo" />
                </Link>
                <nav>
                    <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </footer>
        </div>
    )
}

function App() {
    const router = createHashRouter([
        {
            children: [
                { element: <Home />, path: '/' },
                { element: <Login />, path: '/login' },
                { element: <About />, path: '/about' },
                { element: <Contact />, path: '/contact' },
                { element: <Pomodoro />, path: '/pomodoro' },
            ],
            element: <Root />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
