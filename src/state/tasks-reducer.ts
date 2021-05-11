import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunkType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


export type TaskActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetTasksActionType

const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {

        case "SET-TODOS":

            let stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) : AppThunkType => (dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}

export const removeTaskTC = (todolistId: string, taskId: string) : AppThunkType =>
    (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}

export const addTaskTC = (todoID: string, taskTitle: string) : AppThunkType =>
    (dispatch) => {
    todolistsAPI.createTask(todoID, taskTitle)
        .then((res) => {
            let newTask = res.data.data.item;
            dispatch(addTaskAC(newTask))
        })
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) : AppThunkType =>
    (dispatch
     , getState: () => AppRootStateType) => {

    let allTasks = getState().tasks;
    let tasksForCurrentTodoList = allTasks[todolistId];
    const foundTask = tasksForCurrentTodoList.find((t) => {
        return t.id === taskId
    })
    if (foundTask) {
        const model: UpdateTaskModelType = {
            title: foundTask.title,
            status: status,
            startDate: foundTask.startDate,
            priority: foundTask.priority,
            description: foundTask.description,
            deadline: foundTask.deadline
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                let updatedTaskStatus = res.data.data.item.status
                dispatch(changeTaskStatusAC(taskId, updatedTaskStatus, todolistId))
            })
    }
}

export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) : AppThunkType =>
    (dispatch
     , getState: () => AppRootStateType) => {

    let allTasks = getState().tasks;
    let tasksForCurrentTodoList = allTasks[todolistId];
    const foundTask = tasksForCurrentTodoList.find((t) => {
        return t.id === taskId
    })
    if (foundTask) {
        const model: UpdateTaskModelType = {
            title: title,
            status: foundTask.status,
            startDate: foundTask.startDate,
            priority: foundTask.priority,
            description: foundTask.description,
            deadline: foundTask.deadline

        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                let updatedTitle = res.data.data.item.title
                dispatch(changeTaskTitleAC(taskId, updatedTitle, todolistId))
            })
    }
}
