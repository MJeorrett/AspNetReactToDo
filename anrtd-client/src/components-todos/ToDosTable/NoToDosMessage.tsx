import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectors } from '../../store';

const NoToDosMessage: React.FC = () => {
    const selectedStatuses = useSelector(selectors.toDos.selectedStatuses);

    const message = selectedStatuses.length > 0 ?
        'There are no toDos matching your selected filters.' :
        'You do not have any toDos yet.';

    return (
        <Typography>{message}</Typography>
    );
};

export default NoToDosMessage;