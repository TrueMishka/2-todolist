import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<PropsType> = memo((props) => {
    console.log('AddItemForm is call')
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onClickAddItemToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItemToTodoListHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddItemToTodoListHandler()

    const errorMessageStyles = {color: "hotpink", marginTop: "0", marginBottom: "0"}
    const errorInputClasses = error ? "inputError" : undefined
    const errorMessage = error && <p style={errorMessageStyles}>Please, enter item title</p>

    return (
        <div>
            {/*<input
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddItemToTodoListHandler}
                className={errorInputClasses}
            />*/}
            <TextField
                id="outlined-basic"
                label="New task"
                variant="outlined"
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddItemToTodoListHandler}
                error={error}
                helperText={error && "Please, enter item title"}
            />
            {/*<button onClick={onClickAddItemToTodoListHandler}>+</button>*/}
            <IconButton color="primary" size={"large"}>
                <ControlPointIcon fontSize="inherit" onClick={onClickAddItemToTodoListHandler}/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    );
})