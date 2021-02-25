export enum ToDoStatus {
    New = 0,
    Complete = 1,
    Cancelled = 2,
}

export const toDoStatusColors: {
    [key in ToDoStatus]: string
} = {
    [ToDoStatus.New]: 'dodgerBlue',
    [ToDoStatus.Complete]: '#3caea3',
    [ToDoStatus.Cancelled]: 'grey',
};
