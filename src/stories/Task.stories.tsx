import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../components/Task";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TaskStories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

let changeTaskTitleCallBack = action('title is changed');
let changeTaskStatusCallBack = action('status is changed');
let removeTaskCallBack = action('task is removed');

const Template: Story<TaskPropsType> = (args: TaskPropsType) => <Task {...args}/>;

let baseArgs = {
    changeTaskTitleCallBack,
    changeTaskStatusCallBack,
    removeTaskCallBack
}

export const TaskIsDoneStories = Template.bind({});

TaskIsDoneStories.args = {
...baseArgs,
    task: {id: '1', title: 'React', isDone: true},
    todolistId: 'todolistId'
};

export const TaskIsNotDoneStories = Template.bind({});

TaskIsNotDoneStories.args = {
    ...baseArgs,
    task: {id: '2', title: 'React-Redux', isDone: false},
    todolistId: 'todolistId'
};


