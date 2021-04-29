import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}
export const Task = React.memo(({
                                    todoListId,
                                    task
                                }: TaskPropsType) => {

    console.log('Task was rendered')
    const dispatch = useDispatch();

    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTitleAC(task.id, newTitle, todoListId))
    }, [ dispatch, task.id, todoListId]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todoListId))
    }, [dispatch, task.id, todoListId]);

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todoListId))
    }, [dispatch, task.id, todoListId]);

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