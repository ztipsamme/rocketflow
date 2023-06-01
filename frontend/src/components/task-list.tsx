import React, { useEffect, useState } from 'react'
import TaskCard from './task-card'
import { tasksInterface } from './task-lists'

interface listInterface {
    classes: string
    list: tasksInterface[]
    runAPI: () => any
}

function TaskList(props: listInterface) {
    const [listContent, setListContent] = useState<string>()

    function checkIfEmptyList(list: tasksInterface[]) {
        if (list.toString() === 'activeTask')
            setListContent('You have no active tasks')
        else if (list.toString() === 'today')
            setListContent('You have no tasks planned for today')
        else if (list.toString() === 'done')
            setListContent('You have not completed any tasks')
        else if (list.toString() === 'to-do') setListContent('')
    }

    useEffect(() => {
        checkIfEmptyList(props.list)
    }, [])

    return (
        <>
            <ul className={props.classes}>
                {props.list.map((value: tasksInterface) => (
                    <li key={value.id}>
                        <TaskCard
                            id={value.id}
                            title={value.title}
                            description={value.description}
                            status={value.status}
                            runAPI={props.runAPI}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TaskList
