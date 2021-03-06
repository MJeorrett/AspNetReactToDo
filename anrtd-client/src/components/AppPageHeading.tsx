import { Typography } from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppPageHeadingProps {
    gutterBottom?: boolean,
}
 
const AppPageHeading: React.FC<AppPageHeadingProps> = ({
    children,
    gutterBottom = true,
}) => {
    return (
        <Typography
            variant="h3"
            component="h1"
            color="primary"
            gutterBottom={gutterBottom}
            align="center"
        >
            {children}
        </Typography>
    );
};
 
export default AppPageHeading;