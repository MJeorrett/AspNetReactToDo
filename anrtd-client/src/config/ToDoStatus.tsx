import { useTheme } from '@material-ui/core';

export enum ToDoStatus {
    New = 0,
    Complete = 1,
    Cancelled = 2,
}

export const useToDoStatusColors = (): {
    [key in ToDoStatus]: string
} => {
    const theme = useTheme();
    return {
        [ToDoStatus.New]: theme.palette.primary.main,
        [ToDoStatus.Complete]: theme.palette.secondary.main,
        [ToDoStatus.Cancelled]: theme.palette.grey[400],
    };
};
