import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
            {id: v1(), title: "English", isDone: true},
            {id: v1(), title: "Git", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Book for JS studying", isDone: true},
            {id: v1(), title: "new brain", isDone: false},
        ]
    })

    function removeTask(taskID: string, todoListId: string) {
        tasks[todoListId] = tasks[todoListId].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListId] = [newTask, ...tasks[todoListId]] //добавляем новую такску в копию обновленношл массива тасок
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListId: string) {
        const todoListTasks = tasks[todoListId]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListId: string) {
        const task = tasks[todoListId].find(t => t.id === taskID)
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTodoListTitle(newTitleValue: string, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = newTitleValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        };
        setTodoLists([...todoLists, newTodoList]);
        setTasks({...tasks, [newTodoListID]: []});
    }

    const todoListComponent = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]

        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '10px'}}>
                    <TodoList
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
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
                <Grid container spacing={3}>
                    {todoListComponent}
                </Grid>
            </Container>
        </div>
    );
}

export default App;


