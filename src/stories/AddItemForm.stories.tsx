import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {action} from "@storybook/addon-actions";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {IconButton, TextField} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {AddItemForm} from "../AddItemForm";


export default {
    title: 'ToDoList/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        }
    }
} as ComponentMeta<typeof AddItemForm>;

const TemplateBase: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormBaseExample = TemplateBase.bind({})
AddItemFormBaseExample.args = {
    addItem: action('click add item')
}

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) =>  {
    console.log('AddItemForm is call')
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(true)

    const onClickAddItemToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            args.addItem(trimmedTitle)
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
            <IconButton color="primary" size={"large"}>
                <ControlPointIcon fontSize="inherit" onClick={onClickAddItemToTodoListHandler}/>
            </IconButton>
        </div>
    );
}

export const AddItemFormWithError = TemplateWithError.bind({})
AddItemFormWithError.args = {
    addItem: action('click add item')
}
