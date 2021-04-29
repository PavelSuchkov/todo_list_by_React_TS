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
        const todolistId = '6eddba86-7da2-48dc-8930-c4d49dfb8ef9';
        const title = 'newTitle'
        toDoListAPI.updateTodoList(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}