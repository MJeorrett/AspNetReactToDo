import { useSelector } from 'react-redux';
import { selectors } from '../../store';

const useNoToDoListsMessage = (): string => {
    const selectedStatuses = useSelector(selectors.toDos.selectedStatuses);

    return selectedStatuses.length > 0 ?
        'There are no toDo lists matching your selected filters.' :
        'You do not have any toDo lists yet.';
};

export default useNoToDoListsMessage;