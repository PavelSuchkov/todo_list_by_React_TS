import React, {useEffect, useState} from 'react'
import {toDoListAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        toDoListAPI.getTodos()
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let title = 'TLtitle'
        toDoListAPI.createTodoList(title)
            .then( (response) => {
            setState(response.data);
        } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '6eddba86-7da2-48dc-8930-c4d49dfb8ef9'
       toDoListAPI.deleteTodoList(todolistId)
            .then( (res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'bd07ff61-7cc1-41de-91c3-0b3cf36fa28b';
        const title = 'newTitle'
        toDoListAPI.updateTodoList(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoListId = '29c68d2b-878b-4fb1-ba84-481185247778'
        toDoListAPI.getTasks(todoListId)
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoListId = '29c68d2b-878b-4fb1-ba84-481185247778'
        const taskId = 'c0a62783-ae93-43a2-af83-1f8576adf299'
        toDoListAPI.deleteTask(todoListId, taskId)
            .then((response) => {
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoListId = '29c68d2b-878b-4fb1-ba84-481185247778';
        const title = 'new task title'
        toDoListAPI.createTask(todoListId, title)
            .then((response) => {
                setState(response.data);})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const model = {
        title: 'new task title after changes',
        description: 'some description',
        completed : false,
        status : 1,
        priority : 1,
        startDate : '12',
        deadline : '13'
    }

    useEffect(() => {
        const todoListId = '29c68d2b-878b-4fb1-ba84-481185247778';
        const taskId = '15007dec-b084-4f0d-a066-b0806d4e0501'


        toDoListAPI.updateTask(todoListId, taskId, {
            title: 'new task title after changes',
            description: 'some description',
            completed : false,
            status : 1,
            priority : 1,
            startDate : '',
            deadline : ''})
            .then((response) => {
                setState(response.data);})
    }, [])

    return <div> {JSON.stringify(state)}</div>
}