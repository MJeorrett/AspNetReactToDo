import React from 'react';
import AppPageHeading from '../../components/AppPageHeading';
import TShirtIcon from '../../components/TShirtIcon';
import { TShirtSize } from '../../config/TShirtSize';
import useStyles from './EditToDoStyles';

export interface EditPageTitleProps {
    toDoId: number,
    tShirtSize: TShirtSize,
}

const EditToDoPageTitle: React.FC<EditPageTitleProps> = ({
    toDoId,
    tShirtSize,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.heading}>
            {(tShirtSize > -1) && (
                <TShirtIcon size={tShirtSize} />
            )}
            <AppPageHeading gutterBottom={false}>Edit ToDo #{toDoId}</AppPageHeading>
        </div>
    );
};

export default EditToDoPageTitle;