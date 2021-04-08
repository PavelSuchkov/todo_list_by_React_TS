import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todoListId: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

let initialState: Array<TodoListType> = []

export type ActionsType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {

        case "REMOVE-TODOLIST": {
            let stateCopy = [...state]
            return stateCopy.filter(tl => tl.id !== action.id)
        }

        case "ADD-TODOLIST": {
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            };
            return [newTodoList, ...state]
        }

        case "CHANGE-TODOLIST-TITLE": {
            let stateCopy = [...state]
            const todoList = stateCopy.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return stateCopy
            }
            return stateCopy
        }

        case "CHANGE-TODOLIST-FILTER": {
            let stateCopy = [...state]
            const todoList = stateCopy.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return stateCopy
            }
            return stateCopy
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}


