import React from 'react'
import {
    createHashRouter,
    Link,
    Outlet,
    RouterProvider,
} from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'
import Contact from './views/Contact'
import Pomodoro from './views/Pomodoro'

function Root() {
    return (
        <div className="App container-fluid px-2 text-white">
            <Navbar expand="lg" data-bs-theme="dark">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link eventKey="1" as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link eventKey="2" as={Link} to="/">
                            Settings
                        </Nav.Link>
                        <Nav.Link eventKey="3" as={Link} to="/login">
                            Sign in
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet />
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
