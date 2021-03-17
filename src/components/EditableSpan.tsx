import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);

    const onEditMode = () => setEditMode(true);

    const offEditMode = () =>{
        setEditMode(false);
        props.changeTitle(title);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter'){
            offEditMode();
           /* setEditMode(false)
            props.changeTitle(title)*/
        }
    }
    return (
        editMode
            ? <TextField id="standard-basic" value={title}
                         autoFocus
                         onBlur={offEditMode}
                         onChange={onChangeHandler}
                         onKeyPress={onEnter}
                         />

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}