import { useField } from 'formik';
import AppFormikSelect from '../../components/AppForm/AppFormikSelect';
import { TShirtSize } from '../../config/TShirtSize';
import { mapEnumToOptions } from '../../enumUtils';

export const useTShirtSize = (): TShirtSize => {
    const [{ value }] = useField<TShirtSize>('tShirtSize');

    return value;
};

const ToDoTShirtSizeField: React.FC = () => {
    const tShirtSize = useTShirtSize();
    const tShirtSizeOptions = mapEnumToOptions(TShirtSize);

    return (
        <AppFormikSelect
            name="tShirtSize"
            label="T-shirt size"
            options={tShirtSizeOptions}
            showPleaseSelect
            pleaseSelectText={tShirtSize > -1 ? 'None' : undefined}
        />
    );
};

export default ToDoTShirtSizeField;