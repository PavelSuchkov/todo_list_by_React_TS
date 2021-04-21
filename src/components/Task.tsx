import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";


type taskPropsType = {
    todolistId: string
    task: TaskType
    isDone: boolean
    title: string
    // changeTaskStatus: (id: string, isDone: boolean) => void
    // changeTaskTitle: (id: string, title: string) => void
    // removeTask: (taskId: string) => void
}

export const Task = React.memo(({
                                    todolistId,
                                    task,
                                    isDone,
                                    title,
                                    // changeTaskStatus,
                                    // changeTaskTitle,
                                    // removeTask
                                }: taskPropsType) => {

    console.log('Task was rendered')
    const dispatch = useDispatch()



    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTitleAC(taskId, newTitle, todolistId))}, [dispatch, todolistId]);

    const changeTaskTitleCB = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }, [changeTaskTitle, task.id])


    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) =>
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId)), [dispatch, todolistId])


    const changeTaskStatusCB = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }, [changeTaskStatus, task.id])


    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistId))
    }, [dispatch, task.id, todolistId])

    return (
        <li className={isDone ? "is-done" : ''}>
            <Checkbox checked={isDone}
                      color={'primary'}
                      onChange={changeTaskStatusCB}/>
            <EditableSpan title={title} changeTitle={changeTaskTitleCB}/>
            <IconButton aria-label="delete" onClick={removeTask} color={'primary'}>
                <Delete/>
            </IconButton>
        </li>
    )

})