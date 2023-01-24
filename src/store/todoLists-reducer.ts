import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, CHANGE_TODOLIST_FILTER, CHANGE_TODOLIST_TITLE, REMOVE_TODOLIST} from "./constants";

export type RemoveTodolistAT = {
    type: typeof REMOVE_TODOLIST
    todoListId: string
}
export type AddTodolistAT = {
    type: typeof ADD_TODOLIST
    title: string
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

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistAT => {
    return {type: REMOVE_TODOLIST, todoListId: todoListId}
}
export const AddTodoListAC = (title: string): AddTodolistAT => {
    return {type: ADD_TODOLIST, title: title}
}
export const ChangeTodolistFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: CHANGE_TODOLIST_FILTER, todoListId: todoListId, filter: filter}
}
export const ChangeTodolistTitleAC = (todoListId: string, title: string): ChangeTodolistTitleAT => {
    return {type: CHANGE_TODOLIST_TITLE, todoListId: todoListId, title: title}
}

export const todoListsReducer = (todoLists: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case ADD_TODOLIST:
            const newTodoList: TodoListType = {id: v1(), title: action.title, filter: 'all'}
            return [...todoLists, newTodoList]
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