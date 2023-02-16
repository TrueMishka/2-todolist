import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import ClearIcon from "@mui/icons-material/Clear";
import {TaskType} from "./TodoList";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";

type TaskWithReduxPropsType = {
    todolistId: string
    task: TaskType
}

export const TaskWithRedux:React.FC<TaskWithReduxPropsType> = memo(({task, todolistId}) => {
    console.log('Task is render')

    const dispatch = useDispatch()

    const onClickRemoveTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))
    }
    const onChangeSetTaskTitle = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    }

    //const onClickRemoveTaskHandler = () => removeTask(task.id, todolistId)
    //const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    //const onChangeSetTaskTitle = (newTitle: string) => {
    //    changeTaskTitle(task.id, newTitle, todolistId)
    //}
    const isDoneClasses = task.isDone ? "isDone" : "notIsDone"

    return (
        <div>
            <li key={task.id}>
                <Checkbox checked={task.isDone} onChange={onChangeSetTaskStatus} color="secondary"/>
                <EditableSpan title={task.title} classes={isDoneClasses} callBack={onChangeSetTaskTitle}/>
                <IconButton aria-label="delete" color="primary">
                    <ClearIcon fontSize={'small'} onClick={onClickRemoveTaskHandler}/>
                </IconButton>
            </li>
        </div>
    );
})