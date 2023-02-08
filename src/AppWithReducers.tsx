import React, {Reducer, useReducer} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistsActionType,
    todolistsReducer,
    TodolistType
} from "./store/todoLists-reducer";
import {
    addTaskAC, changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionType,
    tasksReducer,
    TasksStateType
} from "./store/tasks-reducer";

// CRUD:
// Create
// Read (pagination, filtration, sorting)
// Update (edit, modification)
// Delete


// Interface

export function AppWithReducers() {

    //STATE:
    const todoListId_1: string = v1()
    const todoListId_2: string = v1()

    const [todoLists, dispatchTodoLists] = useReducer<Reducer<TodolistType[], TodolistsActionType>>(todolistsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, dispatchTasks] = useReducer<Reducer<TasksStateType, TasksActionType>>(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Juice", isDone: false}
        ]
    })

    //BLL:

    const removeTodoList = (todoListId: string) => {
        let action = removeTodolistAC(todoListId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodoList = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchTodoLists(changeTodolistFilterAC(todoListId, filter))
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatchTodoLists(changeTodolistTitleAC(newTitle, todoListId))
    }

    const removeTask = (taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatchTasks(action)
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, newTitle, todoListId))
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
