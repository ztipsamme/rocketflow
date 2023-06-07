import React, { useEffect, useState } from 'react'
import {
    createHashRouter,
    Outlet,
    Link,
    RouterProvider,
} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import About from './views/About'
import Contact from './views/Contact'
import Pomodoro from './views/Pomodoro'
import NotFound from './views/NotFound'
import axios from 'axios'
import logo from './assets/images/logo.svg'

function Root() {
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey === true && e.code === 'KeyR') {
            const deleteAllTasks = (async () => {
                await axios
                    .delete(
                        '/api/delete-all-tasks/WCbb6Nm6E5EgThucUnrRWhBjfPJqz4'
                    )
                    .then(() => {
                        document.location.reload()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })()
        }
    })
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    }, [windowWidth])

    return (
        <div className="App">
            <nav className="navigation">
                {windowWidth > 1024 ? (
                    <Link className="logo" to="/">
                        <img src={logo} />
                    </Link>
                ) : (
                    <Link className="menu-btn" to="/">
                        <span></span>
                        <span></span>
                    </Link>
                )}
            </nav>
            <Outlet />
            {windowWidth > 1024 && (
                <footer className="page-footer">
                    <Link className="logo" to="/">
                        <img src={logo} />
                    </Link>
                </footer>
            )}
        </div>
    )
}

function App() {
    const router = createHashRouter([
        {
            children: [
                { element: <Home />, path: '/' },
            { element: <Login />, path: '/login' },
            { element: <Signup />, path: '/signup' },
                { element: <About />, path: '/about' },
                { element: <Contact />, path: '/contact' },
                { element: <Pomodoro />, path: '/pomodoro' },
                { element: <NotFound />, path: '/*' },
            ],
            element: <Root />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
