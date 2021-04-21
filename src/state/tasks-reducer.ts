import {TasksStateType, TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}
type ChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}

let initialState: TasksStateType = {}

export type ActionsTypes = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusType | ChangeTaskTitle | AddTodoListActionType
    | RemoveTodoListActionType


export const tasksReducer = (state = initialState, action: ActionsTypes) => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            stateCopy[action.todoListId] = stateCopy[action.todoListId].filter(task => task.id !== action.taskId)
            return stateCopy
        }
        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return  {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id === action.taskId) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST":
            let todoListId = action.todoListId
            return {[todoListId]: [], ...state}

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todoListId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId}
}

export const changeTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitle => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}


