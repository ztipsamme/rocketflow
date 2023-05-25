import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div>
            404 Not Found
            <Link className="button" to="/pomodoro">
                Back to pomodoro
            </Link>
        </div>
    )
}
export default NotFound
