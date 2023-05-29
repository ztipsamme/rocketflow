import React from 'react'
import TaskCard from './task-card'
import { tasksInterface } from './task-lists'

interface listInterface {
    classes: string
    list: tasksInterface[]
}

function TaskList(props: listInterface) {
    return (
        <ul className={props.classes}>
            {props.list.map((value: tasksInterface) => (
                <li key={value.id}>
                    <TaskCard
                        id={value.id}
                        title={value.title}
                        description={value.description}
                        status={value.status}
                    />
                </li>
            ))}
        </ul>
    )
}

export default TaskList
