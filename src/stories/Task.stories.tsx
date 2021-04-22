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

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>;

let baseArgs = {
    changeTaskTitleCallBack,
    changeTaskStatusCallBack,
    removeTaskCallBack
}

export const TaskIsDoneStories = Template.bind({});

TaskIsDoneStories.args = {
    task: {id: '1', title: 'JS', isDone: true},
    todolistId: 'todolistId1'
};

export const TaskIsNotDoneStories = Template.bind({});

TaskIsNotDoneStories.args = {
    task: {id: '2', title: "Milk", isDone: false},
    todolistId: 'todolistId2'
};


