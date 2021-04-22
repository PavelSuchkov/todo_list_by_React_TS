import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm";

export default {
    title: 'AddItemForm',
    component: AddItemForm
} as Meta


const Template: Story<AddItemFormPropsType> = (args: AddItemFormPropsType) => <AddItemForm {...args}/>;

export const AddItemFormStories = Template.bind({});

AddItemFormStories.args = {
    addItem: action('clicked addItem')
};


