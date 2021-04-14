import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    let dispatch = useDispatch()
    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

   /* let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)



    function removeTask(taskID: string, todoListId: string) {
        let action = removeTaskAC(taskID, todoListId)
        dispatch(action)
    }

    function addTask(title: string, todoListId: string) {
        let action = addTaskAC(title, todoListId)
        dispatch(action)
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListId: string) {
        let action = changeTaskStatusAC(taskID, isDone, todoListId);
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListId: string) {
        let action = changeTitleAC(taskID, newTitle, todoListId)
        dispatch(action)
    }*/

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListId: string) {
        let action = ChangeTodoListFilterAC(todoListId, newFilterValue)
        dispatch(action)
    }

    function changeTodoListTitle(newTitleValue: string, todoListId: string) {
        let action = ChangeTodoListTitleAC(todoListId, newTitleValue)
        dispatch(action)

    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatch(action)
    }

    const todoListComponent = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: '10px'}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Menu
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={2}>
                    {todoListComponent}
                </Grid>
            </Container>
        </div>
    );
}
export default AppWithRedux;


