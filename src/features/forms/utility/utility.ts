import { SchemaMap } from "../../../shared/interface/interface";

export const formSchema: SchemaMap = {
    name: {
        type: "text",
        label: "Question Name",
        required: true
    },
    type: {
        type: "select",
        label: "Qustion Type",
        required: true,
        options: [
            {
                label: "Text",
                value: "text"
            },
            {
                label: "Radio",
                value: "radio"
            },
            {
                label: "Multiple choice",
                value: "multipleChoice"
            }
        ]
    }
}

export const LTO_COLUMNS = [
    {
        name: 'Index',
        order: '',
        orderBy: '',
        style: { width: '80px' },
        sort: false
    },
    {
        name: 'Form Name',
        order: '',
        orderBy: 'tapeName',
        className: 'text--center form-cell',
        sort: false
    },
    {
        name: 'Form Url',
        order: '',
        orderBy: 'mediaName',
        style: { width: '320px' },
        sort: false
    },
    {
        name: 'Created At',
        order: '',
        orderBy: 'addedOn',
        style: { width: '80px' },
        sort: false
    },
    {
        name: 'Total Response',
        order: '',
        orderBy: 'addedOn',
        style: { width: '80px' },
        sort: false
    },
];
