import ToDoForm, { ToDoFormComp, ToDoFormValues } from '../../todos/Form';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppButton, { AppButtons } from '../../components/AppButton';
import { ToDoDetails } from '../../models/ToDo';
import AppForm from '../../components/AppForm';
import EditToDoPageTitle from './Title';

export interface EditToDoPageCompProps {
    toDo: ToDoDetails,
    handleUpdateToDo: (toDo: ToDoFormValues) => Promise<unknown>
    backLinkPath: string,
}

const EditToDoPageComp: React.FC<EditToDoPageCompProps> = ({
    toDo,
    handleUpdateToDo,
    backLinkPath,
}) => {
    return (
        <ToDoForm
            onSubmit={handleUpdateToDo}
            initialValues={toDo}
        >
            {formikProps => (
                <>
                    <EditToDoPageTitle
                        toDoId={toDo.id}
                        tShirtSize={formikProps.values.tShirtSize}
                    />
                    <AppForm>
                        <ToDoFormComp
                            {...formikProps}
                        />
                        <AppButtons>
                            <AppButton linkPath={backLinkPath}>Back</AppButton>
                            <AppFormikSubmitButton>Save</AppFormikSubmitButton>
                        </AppButtons>
                    </AppForm>
                </>
            )}
        </ToDoForm>
    );
};

export default EditToDoPageComp;