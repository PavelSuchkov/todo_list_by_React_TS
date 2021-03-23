import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODO-LIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD-TODO-LIST',
    title: string
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

type ActionsType = RemoveTodoListActionType | AddTodoListActionType
    | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListReducer = (state: Array<TodoListType>, action: ActionsType) => {

    switch (action.type) {

        case "REMOVE-TODO-LIST":
            return state.filter(tl => tl.id !== action.id)

        case "ADD-TODO-LIST":
            const newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            };
            return [...state, newTodoList]

        case "CHANGE-TODOLIST-TITLE":
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                 return [...state]
            }
            return state

        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.filter
                return [...state]
            }
            return state
        }

        default:
            return state
    }
}