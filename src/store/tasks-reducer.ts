import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodolistAT, RemoveTodolistAT} from "./todoLists-reducer";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            //const {[action.todoListId]: [], ...rest} = {...state}
            const newState = {...state}
            delete newState[action.todoListId]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}