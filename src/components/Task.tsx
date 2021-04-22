import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo(({
                                    todolistId,
                                    task
                                }: TaskPropsType) => {

    console.log('Task was rendered')
    const dispatch = useDispatch();

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTitleAC(task.id, newTitle, todolistId))
    }, [ dispatch, task.id, todolistId]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))
    }, [dispatch, task.id, todolistId]);

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistId))
    }, [dispatch, task.id, todolistId]);

    return (
        <li className={task.isDone ? "is-done" : ''}>
            <Checkbox checked={task.isDone}
                      color={'primary'}
                      onChange={changeTaskStatus}/>
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton aria-label="delete" onClick={removeTask} color={'primary'}>
                <Delete/>
            </IconButton>
        </li>
    )
})