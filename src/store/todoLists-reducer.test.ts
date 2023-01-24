import {v1} from "uuid";
import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./todoLists-reducer";
import {TodoListType} from "../App";



test('Correct todolist should be add', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ]

    //const action: AddTodolistAT = {type: 'ADD-TODOLIST', title: 'New todoList'}
    const endState = todoListsReducer(startState, AddTodoListAC('New todoList'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todoList')
})

test('Correct todolist should be removed', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ]

    //const action: RemoveTodolistAT = {type: 'REMOVE-TODOLIST', todoListId: todoListId_1}
    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId_1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId_2);
});

test('Correct change todoList filter', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ]

    //const action: ChangeTodolistFilterAT = {type: "CHANGE-TODOLIST-FILTER", todoListId: todoListId_1, filter: "completed"}
    const endState = todoListsReducer(startState, ChangeTodolistFilterAC(todoListId_1, 'completed'))

    expect(endState[0].filter).toBe('completed');
});

test('Correct change todoList title', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ]

    //const action: ChangeTodolistTitleAT = {type: 'CHANGE-TODOLIST-TITLE', todoListId: todoListId_1, title: 'New title'}
    const endState = todoListsReducer(startState, ChangeTodolistTitleAC(todoListId_1, 'New title'))

    expect(endState[0].title).toBe('New title');
});