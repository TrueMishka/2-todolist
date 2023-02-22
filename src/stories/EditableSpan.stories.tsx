import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";


export default {
    title: 'ToDoList/EditableSpan',
    component: EditableSpan,
    argTypes: {
        callBack: {
            description: 'Double click to change title'
        }
    },
    args: {
        callBack: action('Double click to change title')
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanBaseExample = Template.bind({})
EditableSpanBaseExample.args = {
    title: 'Start value'
}

const TemplateEditable: ComponentStory<typeof EditableSpan> = (args) => {
    const [title, setTitle] = useState(args.title)
    const changeTitle = (newTitle: string) => {
        setTitle(newTitle)
    }
    return <EditableSpan title={title} callBack={changeTitle}/>
}
export const EditableSpanEditable = TemplateEditable.bind({})
EditableSpanEditable.args = {
    title: 'Start value'
}