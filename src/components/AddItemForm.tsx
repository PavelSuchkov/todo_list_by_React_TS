import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    return (
        <div>
            <TextField id="standard-basic" label="Type title"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressAddItem}
                       error={!!error}
                       helperText={error}/>

            <IconButton onClick={addItem} color={'primary'}><AddBox /></IconButton>
        </div>
    )
}