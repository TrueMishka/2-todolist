import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
    TodolistType
} from "./todoLists-reducer";

let todoListId_1: string
let todoListId_2: string
let startState: TodolistType[]

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()
    startState = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]
})

test('Correct todolist should be add', () => {

    //const action: AddTodolistAT = {type: 'ADD-TODOLIST', title: 'New todoList'}
    const endState = todolistsReducer(startState, addTodolistAC('New todoList'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todoList')
})

test('Correct todolist should be removed', () => {

    //const action: RemoveTodolistAT = {type: 'REMOVE-TODOLIST', todoListId: todoListId_1}
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});

test('Correct change todoList filter', () => {

    //const action: ChangeTodolistFilterAT = {type: "CHANGE-TODOLIST-FILTER", todoListId: todoListId_1, filter: "completed"}
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todoListId_1, 'completed'))

    expect(endState[0].filter).toBe('completed');
});

test('Correct change todoList title', () => {

    //const action: ChangeTodolistTitleAT = {type: 'CHANGE-TODOLIST-TITLE', todoListId: todoListId_1, title: 'New title'}
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todoListId_1, 'New title'))

    expect(endState[0].title).toBe('New title');
});