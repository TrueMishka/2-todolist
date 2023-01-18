import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input, Typography} from "@mui/material";

type PropsType = {
    title: string
    classes?: string
    callBack: (value: string) => void
}

export const EditableSpan: React.FC<PropsType> = (props) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const odEdit = () => {setEditMode(true)}
    const offEdit = () => {
        setEditMode(false)
        props.callBack(title)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && offEdit()
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        /*editMode
            ? <input value={title} onChange={onChangeInputHandler} onKeyDown={onKeyDownHandler} onBlur={offEdit} autoFocus/>
            : <span className={props.classes} onDoubleClick={odEdit}>{props.title}</span>*/
        editMode
            ? <Input value={title} onChange={onChangeInputHandler} onKeyDown={onKeyDownHandler} onBlur={offEdit} autoFocus />
            : <span className={props.classes} onDoubleClick={odEdit}>{props.title}</span>
    );
};