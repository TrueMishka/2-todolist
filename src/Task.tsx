import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import ClearIcon from "@mui/icons-material/Clear";
import {TaskType} from "./TodoList";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
}

export const Task:React.FC<TaskPropsType> = memo(({task, todolistId, removeTask, changeTaskTitle, changeTaskStatus}) => {
    console.log('Task is render')



    const onClickRemoveTaskHandler = () => removeTask(task.id, todolistId)
    const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    const onChangeSetTaskTitle = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todolistId)
    }
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