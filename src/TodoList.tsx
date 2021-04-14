import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAC} from "./state/tasks-reducer";


type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (newTitleValue: string, todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {


    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch();


    const setAllFilter = () => props.changeTodoListFilter("all", props.todoListID)

    const setActiveFilter = () => props.changeTodoListFilter("active", props.todoListID)

    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.todoListID)

    let tasksForTodoList = tasks;

    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    const removeTodoList = () => props.removeTodoList(props.todoListID)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)

    const filteredTasks = tasksForTodoList.map((t) => {

        // const addTask = (title: string) => {
        //     dispatch(addTaskAC(title, props.todoListID))
        // }

        const removeTask = () => dispatch(removeTaskAC(t.id, props.todoListID))

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.todoListID))

        const changeTaskTitle = (newTitle: string) => {
            dispatch(changeTitleAC(t.id, newTitle, props.todoListID))
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
            <AddItemForm addItem={(title) => {dispatch(addTaskAC(title, props.todoListID))}}/>

            <div style={{listStyle: 'none', paddingLeft: '0'}}>
                {filteredTasks}
            </div>

            <div>
                <Button variant={'outlined'} color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={setAllFilter}>All
                </Button>
                <Button variant={'outlined'} color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={setActiveFilter}>Active
                </Button>
                <Button variant={'outlined'} color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}

export default TodoList;