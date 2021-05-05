import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
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

const  AppWithRedux = React.memo(() => {

    let dispatch = useDispatch()
    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListId: string) => {
        let action = ChangeTodoListFilterAC(todoListId, newFilterValue)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitleValue: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(todoListId, newTitleValue)
        dispatch(action)

    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const todoListComponent = todoLists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={3} style={{padding: '10px'}}>
                    <TodoList
                        key={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        todoListID={tl.id}
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
})
export default AppWithRedux;


