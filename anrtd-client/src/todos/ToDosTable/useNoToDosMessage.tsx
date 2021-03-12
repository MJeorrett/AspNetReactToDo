import { useSelector } from 'react-redux';
import { selectors } from '../../store';

const useNoToDosMessage = (): string => {
    const selectedStatuses = useSelector(selectors.toDos.selectedStatuses);

    return selectedStatuses.length > 0 ?
        'There are no toDos matching your selected filters.' :
        'You do not have any toDos yet.';
};

export default useNoToDosMessage;