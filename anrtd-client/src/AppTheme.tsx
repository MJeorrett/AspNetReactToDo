import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1E90FF',
        },
        secondary: {
            main: '#00c398',
        },
    },
});

const AppTheme: React.FC = ({
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default AppTheme;