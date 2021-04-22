import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "../AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC} from "../state/tasks-reducer";
import {Task} from "./Task";

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (newTitleValue: string, todoListId: string) => void
}

export const TodoList = React.memo(({
                                        todoListID,
                                        title,
                                        filter,
                                        removeTodoList,
                                        changeTodoListFilter,
                                        changeTodoListTitle
                                    }: TodoListPropsType) => {
    console.log('todolist was rendered');

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoListID])
    const dispatch = useDispatch();

    const setAllFilter = useCallback(
        () => changeTodoListFilter("all", todoListID),
        [changeTodoListFilter, todoListID]);

    const setActiveFilter = useCallback(
        () => changeTodoListFilter("active", todoListID),
        [changeTodoListFilter, todoListID]);

    const setCompletedFilter = useCallback(
        () => changeTodoListFilter("completed", todoListID),
        [changeTodoListFilter, todoListID]);

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }

    const removeTodoListCB = useCallback(() => removeTodoList(todoListID),
        [removeTodoList, todoListID]);

    const changeTodoListTitleCB = useCallback(
        (title: string) => changeTodoListTitle(title, todoListID),
        [changeTodoListTitle, todoListID]);

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch, todoListID])

    const filteredTasks = tasksForTodoList.map((t) => {

        return (
            <Task
                todolistId={todoListID}
                task={t}
                key={t.id}/>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodoListTitleCB}/>
                <IconButton aria-label="delete" onClick={removeTodoListCB} color={'primary'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div style={{listStyle: 'none', paddingLeft: '0'}}>

                {filteredTasks}

            </div>
            <div>
                <Button variant={'outlined'} color={filter === 'all' ? 'secondary' : 'primary'}
                        onClick={setAllFilter}>All
                </Button>
                <Button variant={'outlined'} color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={setActiveFilter}>Active
                </Button>
                <Button variant={'outlined'} color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={setCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;