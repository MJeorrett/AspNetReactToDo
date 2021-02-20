import { Route, Switch } from 'react-router-dom';
import CreateToDoPage from './pages/CreateToDo';
import HomePage from './pages/Home';
import ToDosPage from './pages/ToDos';

export const appPaths = {
    home: '/',
    toDos: '/todos',
    createToDo: '/todos/create',
};

const AppRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path={appPaths.toDos} exact><ToDosPage /></Route>
            <Route path={appPaths.createToDo} exact><CreateToDoPage /></Route>
            <Route path={appPaths.home}><HomePage /></Route>
        </Switch>
    );
}
 
export default AppRoutes;