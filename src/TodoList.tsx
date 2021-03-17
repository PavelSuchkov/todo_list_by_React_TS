import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    changeTaskStatus: (takID: string, isDone: boolean, todoListId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (newTitleValue: string, todoListId: string) => void
}

function TodoList(props: TodoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const setAllFilter = () => props.changeTodoListFilter("all", props.todoListID)

    const setActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)

    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.todoListID)

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID);

        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todoListID)
        }

        return (
            <div className={t.isDone ? "is-done" : ''}>
                <Checkbox checked={t.isDone}
                          color={'primary'}
                          onChange={changeTaskStatus}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton aria-label="delete" onClick={removeTask} color={'primary'}>
                    <Delete/>
                </IconButton>

            </div>
        )
    })
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete" onClick={removeTodoList} color={'primary'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={ { listStyle: 'none', paddingLeft: '0'} }>
                {tasks}
            </div>
            <div>
                <Button variant={'outlined'} color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={setAllFilter}>All
                </Button>
                <Button variant={'outlined'}  color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={setActiveFilter}>Active
                </Button>
                <Button variant={'outlined'}  color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;