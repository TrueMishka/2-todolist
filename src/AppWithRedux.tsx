import React, {useCallback} from 'react';
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

    const removeTodoList = useCallback((todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, filter))
    }, [dispatch])
    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todoListId))
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }, [dispatch])

    //UI:

    const todoListsItems = todoLists.map(tl => {
        return (
            <Grid item xs={4} key={tl.id}>
                <Paper elevation={3} sx={{p: "20px"}}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasks[tl.id]}

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
