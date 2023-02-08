import React from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistType
} from "./store/todoLists-reducer";
import {
    addTaskAC, changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStoreType} from "./store/store";

// CRUD:
// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete


// Interface

export function AppWithRedux() {

    //STATE:

    const todoLists = useSelector<AppRootStoreType, TodolistType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStoreType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    //BLL:

    const removeTodoList = (todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatch(action)
    }
    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todoListId))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    //UI:

    const getFilteredTasksForRender = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const todoListsItems = todoLists.map(tl => {
        const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Grid item xs={4}>
                <Paper elevation={3} sx={{p: "20px"}}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={filteredTasksForRender}

                        removeTodoList={removeTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListFilter={changeTodoListFilter}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container  sx={{p: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsItems}
                </Grid>
            </Container>
        </div>
    );
}
