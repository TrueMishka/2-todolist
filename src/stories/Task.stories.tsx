import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

export default {
    title: 'ToDoList/Task',
    component: Task,
    args: {
        removeTask: action('remove task'),
        changeTaskStatus: action('change task status'),
        changeTaskTitle: action('change task title')
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskIsDoneBaseExample = Template.bind({})
TaskIsDoneBaseExample.args = {
    task: {id: '1', title: 'React', isDone: true},
    todolistId: 'todolistId_1'
}

export const TaskIsNotDoneBaseExample = Template.bind({})
TaskIsNotDoneBaseExample.args = {
    task: {id: '2', title: 'Redux', isDone: false},
    todolistId: 'todolistId_2'
}

export const TemplateEditable: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState(args.task)
    const onChangeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }
    const onChangeTaskTitle = (task_id: string, newTitle: string) => {
        setTask({...task, title: newTitle})
    }

    return <Task todolistId={args.todolistId}
                 task={task}
                 removeTask={args.removeTask}
                 changeTaskStatus={onChangeTaskStatus}
                 changeTaskTitle={onChangeTaskTitle}
    />
}
TemplateEditable.args = {
    task: {id: '2', title: 'Redux', isDone: false},
    todolistId: 'todolistId_2'
}