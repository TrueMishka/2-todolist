import React, {ChangeEvent, memo, useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Grid, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import {FilterValuesType} from "./store/todoLists-reducer";
import {Task} from "./Task";
import {TaskWithRedux} from "./TaskWithRedux";

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

export const TodoList: React.FC<TodolistPropsType> = memo(({todoListId, ...props}) => {
    console.log('Todolist is render')

    let filteredTasks = props.tasks

    if (props.filter === 'active') {
        filteredTasks = props.tasks.filter(t => !t.isDone)
    } else if (props.filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.isDone)
    }


    const tasksItems = filteredTasks.length
        ? filteredTasks.map((task: TaskType) => {
            /*return <Task key={task.id}
                         todolistId={todoListId}
                         task={task}
                         removeTask={props.removeTask}
                         changeTaskStatus={props.changeTaskStatus}
                         changeTaskTitle={props.changeTaskTitle}/>*/
            return <TaskWithRedux key={task.id} todolistId={todoListId} task={task}/>
        })
        : <span>Tasks list is empty</span>

    const addTask = useCallback((newTitle: string) => {
        props.addTask(newTitle, todoListId)
    }, [props.addTask])

    const getOnClickSetFilterHandler = useCallback((filter: FilterValuesType) => () => {
        props.changeTodoListFilter(filter, todoListId)
    }, [props.changeTodoListFilter, todoListId])
    const onClickRemoveTodoListHandler = useCallback(() => {
        props.removeTodoList(todoListId)
    }, [props.removeTodoList, todoListId])
    const changeTodoListTitleHandler = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, todoListId)
    }, [props.changeTodoListTitle, todoListId])

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
            </div>
        </div>
    );
})

/*
type IconButtonDeleteMemoPropsType = {
    onClickHandler: () => void
}

const IconButtonDeleteMemo = memo(({onClickHandler}: IconButtonDeleteMemoPropsType) => {
    console.log('IconButtonDeleteMemo')
    return <IconButton onClick={onClickHandler}>
        <Delete />
    </IconButton>
})*/
