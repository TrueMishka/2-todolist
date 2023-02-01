import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "./constants";

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    todoListId: string
}
export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    title: string
    todolistId: string
}
export type ChangeTodolistFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    todoListId: string
    filter: FilterValuesType
}
export type ChangeTodolistTitleAT = {
    type: typeof CHANGE_TODOLIST_TITLE
    todoListId: string
    title: string
}

type ActionType = AddTodolistAT
    | RemoveTodolistAT
    | ChangeTodolistFilterAT
    | ChangeTodolistTitleAT

export const todolistsReducer = (todoLists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            const newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'}
            return [...todoLists, newTodolist]
        case REMOVE_TODOLIST:
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case CHANGE_TODOLIST_FILTER:
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case CHANGE_TODOLIST_TITLE:
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistAT => {
    return {type: REMOVE_TODOLIST, todoListId: todoListId}
}
export const addTodolistAC = (title: string): AddTodolistAT => {
    return {type: ADD_TODOLIST, title: title, todolistId: v1()}
}
export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: CHANGE_TODOLIST_FILTER, todoListId: todoListId, filter: filter}
}
export const changeTodolistTitleAC = (todoListId: string, title: string): ChangeTodolistTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, todoListId: todoListId, title: title}
}