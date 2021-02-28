import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes, { appPaths } from './AppRoutes';
import AppTheme from './AppTheme';
import store from './store';

const App: React.FC = () => {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Provider store={store}>
                <AppTheme>
                    <ToastContainer />
                    <Router>
                        <ul>
                            <li><Link to={appPaths.home}>Home</Link></li>
                            <li><Link to={appPaths.createToDo}>Create ToDo</Link></li>
                            <li><Link to={appPaths.toDos}>ToDos</Link></li>
                        </ul>
                        <AppRoutes />
                    </Router>
                </AppTheme>
            </Provider>
        </MuiPickersUtilsProvider>
    );
};

export default App;
