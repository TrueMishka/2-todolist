import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<PropsType> = (props) => {
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
            <input
                value={title}
                onChange={onChangeSetLocalTitleHandler}
                onKeyDown={onKeyDownAddItemToTodoListHandler}
                className={errorInputClasses}
            />
            <button onClick={onClickAddItemToTodoListHandler}>+</button>
            {errorMessage}
        </div>
    );
};