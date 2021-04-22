import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = React.memo(({title,
                                            changeTitle }: EditableSpanPropsType) => {

    console.log('Editable span was rendered')

    const [editMode, setEditMode] = useState<boolean>(false);
    const [taskTitle, setTaskTitle] = useState<string>(title);

    const onEditMode = useCallback(() => setEditMode(true), []);

    const offEditMode = useCallback(() => {
        setEditMode(false);
        changeTitle(taskTitle);
    }, [changeTitle, taskTitle])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setTaskTitle(e.currentTarget.value), []);

    const onEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            offEditMode();
        }
    }, [offEditMode]);

    return (
        editMode
            ? <TextField id="standard-basic" value={taskTitle}
                         autoFocus
                         onBlur={offEditMode}
                         onChange={onChangeHandler}
                         onKeyPress={onEnter}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})