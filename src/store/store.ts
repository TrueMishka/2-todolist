import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer, TodolistType} from "./todoLists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {v1} from "uuid";

/*const todoListId_1: string = v1()
const todoListId_2: string = v1()
const todoListsInit: TodolistType[] = [
    {id: todoListId_1, title: 'What to learn', filter: 'all'},
    {id: todoListId_2, title: 'What to buy', filter: 'all'}
]
const tasksInit: TasksStateType = {
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
}*/


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

//export const store = legacy_createStore(rootReducer, {todoLists: todoListsInit, tasks: tasksInit})
export const store = legacy_createStore(rootReducer)

export type AppRootStoreType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store