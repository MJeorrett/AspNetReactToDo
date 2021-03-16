import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppButton, { AppButtons } from '../../components/AppButton';
import { ToDoDetails } from '../../models/ToDo';
import AppForm from '../../components/AppForm';
import EditToDoPageTitle from './Title';
import { ToDoFields, useTShirtSize } from '../../todos/Form';

export interface EditToDoPageCompProps {
    toDo: ToDoDetails,
    backLinkPath: string,
}

const EditToDoPageComp: React.FC<EditToDoPageCompProps> = ({
    toDo,
    backLinkPath,
}) => {
    const tShirtSize = useTShirtSize();

    return (
        <>
            <EditToDoPageTitle
                toDoId={toDo.id}
                tShirtSize={tShirtSize}
            />
            <AppForm>
                <ToDoFields.Title />
                <ToDoFields.Tags />
                <ToDoFields.Status />
                <ToDoFields.TShirtSize />
                <ToDoFields.DueDate />
                <ToDoFields.CreatedDate readonly />
                <ToDoFields.LastModifiedDate readonly />
                <AppButtons>
                    <AppButton linkPath={backLinkPath}>Back</AppButton>
                    <AppFormikSubmitButton>Save</AppFormikSubmitButton>
                </AppButtons>
            </AppForm>
        </>
    );
};

export default EditToDoPageComp;