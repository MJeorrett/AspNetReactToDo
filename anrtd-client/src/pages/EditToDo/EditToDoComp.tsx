import ToDoForm, { ToDoFormComponent, ToDoFormValues } from '../../components-todos/Form';
import AppPageHeading from '../../components/AppPageHeading';
import AppFormikSubmitButton from '../../components/AppForm/AppFormikSubmitButton';
import AppButton, { AppButtons } from '../../components/AppButton';
import TShirtIcon from '../../components/TShirtIcon';
import { ToDoDetails } from '../../models/ToDo';
import useStyles from './EditToDoStyles';

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
    const classes = useStyles();

    return (
        <>
            <ToDoForm
                onSubmit={handleUpdateToDo}
                initialValues={toDo}
            >
                {formikProps => (
                    <>
                        <div className={classes.heading}>
                            {(formikProps.values.tShirtSize || formikProps.values.tShirtSize === 0) && (
                                <TShirtIcon size={formikProps.values.tShirtSize} />
                            )}
                            <AppPageHeading gutterBottom={false}>Edit ToDo #{toDo.id}</AppPageHeading>
                        </div>
                        <ToDoFormComponent
                            {...formikProps}
                        />
                        <AppButtons>
                            <AppButton linkPath={backLinkPath}>Back</AppButton>
                            <AppFormikSubmitButton>Save</AppFormikSubmitButton>
                        </AppButtons>
                    </>
                )}
            </ToDoForm>
        </>
    );
};

export default EditToDoPageComp;