import React, { useEffect, useState } from 'react'
import {
    createHashRouter,
    Link,
    Outlet,
    RouterProvider,
} from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import About from './views/About'
import Contact from './views/Contact'
import Pomodoro from './views/Pomodoro'
import NotFound from './views/NotFound'

function Root() {
    return (
        <div className="App">
            <nav className="navigation"></nav>
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
