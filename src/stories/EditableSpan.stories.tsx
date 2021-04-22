import React from 'react';
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm";
import {EditableSpan, EditableSpanPropsType} from "../components/EditableSpan";

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        title: {
            defaultValue: 'React'
        }
    }
} as Meta


const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStories = Template.bind({});

EditableSpanStories.args = {
    changeTitle: action('Value changed')
};

export const NewEditableSpanStories = Template.bind({});

EditableSpanStories.args = {
    changeTitle: action('Value changed')
};

