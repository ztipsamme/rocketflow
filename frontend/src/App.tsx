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
import logo from './assets/images/logo.svg'

function Root() {
    return (
        <>
            <header>
                <div className="hb-menu"></div>
                <div className="menu">
                    <Link to="/" className="logo">
                        <img
                            className="logo"
                            src={logo}
                            alt="Rocketflow logo"
                        />
                    </Link>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <button>Try Rocketflow</button>
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
        </>
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
            ],
            element: <Root />,
        },
    ])

    return <RouterProvider router={router} />
}

export default App
