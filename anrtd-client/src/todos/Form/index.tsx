import AppFormikDatePicker from '../../components/AppForm/AppFormikDatePicker';
import { createPreconfiguredAppFormikDatePicker, createPreconfiguredAppFormikTextField } from '../../components/AppForm';
import AppFormikTagInput, { createPreconfiguredAppFormikTagInput } from '../../components/AppFormikTagInput';
import Status from './ToDoStatusField';
import TShirtSize from './ToDoTShirtSizeField';

export { default } from './ToDoForm';
export type { ToDoFormValues } from './ToDoFormValues';
export { useTShirtSize } from './ToDoTShirtSizeField';


export const ToDoFields = {
    Status,
    TShirtSize,
    Title: createPreconfiguredAppFormikTextField({ name: 'title', label: 'Title' }),
    Tags: createPreconfiguredAppFormikTagInput({ name: 'tags' }),
    DueDate: createPreconfiguredAppFormikDatePicker({ name: 'dueDate', label: 'Due Date' }),
    CreatedDate: createPreconfiguredAppFormikDatePicker({ name: 'createdDate', label: 'Created Date' }),
    LastModifiedDate: createPreconfiguredAppFormikDatePicker({ name: 'lastModifiedDate', label: 'Last Modified Date' }),
};
