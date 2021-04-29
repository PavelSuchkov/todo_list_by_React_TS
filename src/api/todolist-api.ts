import axios from 'axios'


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
        'API-KEY': '77e3abfb-dd75-4904-b56a-e26f0cfa27af'
    }
})



type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export const toDoListAPI = {

    getTodos() {
        return  instance.get<CommonResponseType<{item: TodoType}>>(`/todo-lists`)
    },

    createTodoList(title: string) {
        return  instance.post<CommonResponseType>(`/todo-lists`, {title})
    },

    updateTodoList(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },

    deleteTodoList(todolistId: string) {
        return  instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    }
}