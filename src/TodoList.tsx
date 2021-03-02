import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";


type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskID: string, todoListId: string) => void
    changeTaskStatus: (takID: string, isDone: boolean, todoListId: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const setAllFilter = () => {
        props.changeTodoListFilter("all", props.id)
    }
    const setActiveFilter = () => {
        props.changeTodoListFilter("active", props.id)
    }
    const setCompletedFilter = () => {
        props.changeTodoListFilter("completed", props.id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)

        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        return (
            <li className={t.isDone ? "is-done" : ''}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X
                </button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>Title is required</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={() => {setAllFilter()}}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={() => {setActiveFilter()}}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={() => {setCompletedFilter()}}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;