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
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}

type GetTasksResponseType = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}

type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const toDoListAPI = {

    getTodos() {
        return instance.get<CommonResponseType<{ item: TodoType }>>(`/todo-lists`)
    },

    createTodoList(title: string) {
        return instance.post<CommonResponseType>(`/todo-lists`, {title})
    },

    updateTodoList(todoListId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todoListId}`, {title})
    },

    deleteTodoList(todoListId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todoListId}`)
    },

    getTasks(todoListId: string) {
       return instance.get<GetTasksResponseType>(`/todo-lists/${todoListId}/tasks`)
    },

    createTask(todoListId: string, taskTitle: string) {
        return instance.post<GetTasksResponseType>(`/todo-lists/${todoListId}/tasks`, {title: taskTitle})
    },

    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },

    updateTask(todoListId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<CommonResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    }

}