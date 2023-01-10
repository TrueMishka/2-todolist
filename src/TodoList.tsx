import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";
// title - заголовок
// tasks - список задач

type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = ({todoListId, ...props}) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => props.removeTask(task.id, todoListId)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
            const isDoneClasses = task.isDone ? "isDone" : "notIsDone"
            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeSetTaskStatus}
                    />
                    <span className={isDoneClasses}>{task.title}</span>
                    <button onClick={onClickRemoveTaskHandler}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const onClickAddTaskToTodoListHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskToTodoListHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTaskToTodoListHandler()
    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, todoListId)
    const onClickRemoveTodoListHandler = () => props.removeTodoList(todoListId)

    const errorMessageStyles = {color: "hotpink", marginTop: "0", marginBottom: "0"}
    const errorInputClasses = error ? "inputError" : undefined
    const errorMessage = error && <p style={errorMessageStyles}>Please, enter task title</p>

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveTodoListHandler}>x</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskToTodoListHandler}
                    className={errorInputClasses}
                />
                <button onClick={onClickAddTaskToTodoListHandler}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "activeFilter" : undefined}
                    onClick={getOnClickSetFilterHandler("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "activeFilter" : undefined}
                    onClick={getOnClickSetFilterHandler("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "activeFilter" : undefined}
                    onClick={getOnClickSetFilterHandler("completed")}>Completed
                </button>
            </div>
        </div>
    );
};