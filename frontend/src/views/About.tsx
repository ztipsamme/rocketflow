import React from 'react'
import { useEffect } from 'react'

function About() {
    useEffect(() => {
        fetch('/api')
            .then((response) => response.json())
            .then((result) => {
                alert(`Hello ${result.hello}!`)
            })
    }, [])
    return <div>About</div>
}

export default About
