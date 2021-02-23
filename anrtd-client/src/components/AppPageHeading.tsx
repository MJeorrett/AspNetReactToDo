import { Typography } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppPageHeadingProps {
    
}
 
const AppPageHeading: React.SFC<AppPageHeadingProps> = ({
    children,
}) => {
    return (
        <Typography
            variant="h3"
            component="h1"
            color="primary"
            gutterBottom
        >
            {children}
        </Typography>
    );
};
 
export default AppPageHeading;