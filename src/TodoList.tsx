import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

// title - заголовок
// tasks - список задач

type TodolistPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>

    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

    addTask: (title: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodolistPropsType> = ({todoListId, ...props}) => {
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const onClickRemoveTaskHandler = () => props.removeTask(task.id, todoListId)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, todoListId)
            const onChangeSetTaskTitle = (newTitle: string) => {
                props.changeTaskTitle(task.id, newTitle, todoListId)
            }
            const isDoneClasses = task.isDone ? "isDone" : "notIsDone"
            return (
                <li key={task.id}>
                    {/*<input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeSetTaskStatus}
                    />*/}
                        <Checkbox checked={task.isDone} onChange={onChangeSetTaskStatus} color="secondary"/>
                        <EditableSpan title={task.title} classes={isDoneClasses} callBack={onChangeSetTaskTitle}/>

                    {/*<button onClick={onClickRemoveTaskHandler}>x</button>*/}
                    <IconButton aria-label="delete" color="primary">
                        <ClearIcon fontSize={'small'} onClick={onClickRemoveTaskHandler}/>
                    </IconButton>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const addTask = (newTitle: string) => {
        props.addTask(newTitle, todoListId)
    }

    const getOnClickSetFilterHandler = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, todoListId)
    const onClickRemoveTodoListHandler = () => props.removeTodoList(todoListId)
    const changeTodoListTitleHandler = (newTitle: string) => props.changeTodoListTitle(newTitle, todoListId)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} classes={''} callBack={changeTodoListTitleHandler}/>
                <IconButton aria-label="delete" color="primary" style={{marginLeft: "20px"}}>
                    <DeleteIcon onClick={onClickRemoveTodoListHandler}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <ButtonGroup
                    variant="text"
                    sx={{mt: "10px"}}
                    fullWidth
                >
                    <Button
                        /*style={{margin: "20px"}}*/
                        sx={{mr: "5px"}}
                        size="small"
                        color={"primary"}
                        variant={props.filter === "all" ? "contained" : 'outlined'}
                        onClick={getOnClickSetFilterHandler("all")}
                    >
                        All
                    </Button>
                    <Button
                        sx={{mr: "5px"}}
                        size="small"
                        color={"primary"}
                        variant={props.filter === "active" ? "contained" : 'outlined'}
                        onClick={getOnClickSetFilterHandler("active")}
                    >
                        Active
                    </Button>
                    <Button
                        size="small"
                        color={"primary"}
                        variant={props.filter === "completed" ? "contained" : 'outlined'}
                        onClick={getOnClickSetFilterHandler("completed")}
                    >
                        Completed
                    </Button>
                </ButtonGroup>
                {/*<button
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
                </button>*/}
            </div>
        </div>
    );
};