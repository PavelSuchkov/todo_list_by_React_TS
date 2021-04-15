import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";


type taskPropsType = {
    task: TaskType
    isDone: boolean
    title: string
    changeTaskStatus: (id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, title: string) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo(({
                                    task,
                                    isDone,
                                    title,
                                    changeTaskStatus,
                                    changeTaskTitle,
                                    removeTask
                                }: taskPropsType) => {

    console.log('Task was rendered')

    const changeTaskTitleCB = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }, [changeTaskTitle, task.id])

    const changeTaskStatusCB = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }, [changeTaskStatus, task.id])

    const removeTaskCB = useCallback(() => {
        removeTask(task.id)
    }, [removeTask, task.id])

    return (
        <li className={isDone ? "is-done" : ''}>
            <Checkbox checked={isDone}
                      color={'primary'}
                      onChange={changeTaskStatusCB}/>
            <EditableSpan title={title} changeTitle={changeTaskTitleCB}/>
            <IconButton aria-label="delete" onClick={removeTaskCB} color={'primary'}>
                <Delete/>
            </IconButton>
        </li>
    )

})